import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {AuthService} from "./auth.service";
import {Router} from '@angular/router';
import {User} from '../models/user'


@Injectable()
export class SlackService {
  private url:string = 'https://slack.com/api';
  private socket: any;

  static USER_STORE_KEY: string = 'USER_STORE_KEY';
  private userStore: User[] = this.getCurrentUserStore();
  private usersObservable: Observable<User[]>;
  private usersObserver: Observer<User[]>;

  constructor(private http:Http, private router:Router, private authService:AuthService) { }

  authorise(code:string) {
    let redirectUrl = `${window.location.origin}/auth/callback`;
    return this.http
      .get('auth/authenticate?code='+code + '&redirect_uri='+redirectUrl)
      .map(resp => resp.json())
      .toPromise();
  }

  getRtmStartAsStream(): any {
    return this.http
        .get(`${this.url}/rtm.start?token=${this.authService.getAccessToken()}`)
        .map(resp => resp.json())
        .share()
        .catch((err: any) => {
          console.log('Error getting stream - logging user out', err, err.status);

          if(err.status === 429 && this.userStore.length > 0){
            //TODO create merge of a new getRtmStart delayed stream and this
            return Observable.of(this.userStore);
          }
          else {
            this.exit();
            return Observable.empty();
          }

        });
  }

  exit(){
    this.authService.logout();
    return this.router.navigate(['/login']);
  }

  initRtmUsersSocket(rtmStartObservable: Observable<any>){
    return rtmStartObservable.subscribe(rtmStart => {

      if(!rtmStart.ok){
        console.log('Error with rtm start response - logging user out', rtmStart);
        return this.exit();
      }

      this.connectToSocket(rtmStart.url);
    });
  }

  connectToSocket(url){

    if(this.socket){
      this.socket.close();
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = (...params:any[]) => {};

    this.socket.onmessage = (message: any = {}) => {

      let messageData = message.data && JSON.parse(message.data) || {};
      console.log('New event', messageData);

      //TODO listen to new / removed user event

      if(messageData.type === 'reconnect_url'){
        // return this.connectToSocket(messageData.url);
      }
      else if(messageData.type === 'team_join'){
        this.userStore.push(messageData.user);
        return this.usersObserver.next(this.userStore);
      }
      else if(messageData.type === 'presence_change'){
        let user = this.userStore.find(user => user.id === messageData.user);
        if(user){
          user.presence = messageData.presence;
          return this.usersObserver.next(this.userStore);
        }
      }
      else if(messageData.type === 'user_change'){
        let user = this.userStore.find(user => user.id === messageData.user.id);
        if(user){
          Object.assign(user, messageData.user);
          return this.usersObserver.next(this.userStore);
        }
      }
    };
  }

  getUsersAsStream(){

    if( ! this.usersObservable ){

      let rtmStartObservable = this.getRtmStartAsStream();

      this.initRtmUsersSocket(rtmStartObservable);

      this.usersObservable = Observable.merge(
          new Observable(observer => this.usersObserver = observer),
          rtmStartObservable.map(rtmStart => rtmStart.users)
      ).share();

      this.usersObservable.subscribe(this.updateUserStore);
    }

    if(this.userStore.length > 0){
      setTimeout(() => this.usersObserver.next(this.userStore));
    }

    return this.usersObservable;
  }


  getCurrentUserStore(){
    try {
      let currentStoreString = SlackService.getCurrentUserStoreString();
      return currentStoreString ? JSON.parse(currentStoreString) : [];
    }
    catch(err){
      console.error('Error getting current user store', err);
      return [];
    }
  }

  static getCurrentUserStoreString(){
    return window.localStorage.getItem(SlackService.USER_STORE_KEY);
  }

  updateUserStore(users: User[]) {

    if(! users || users.length === 0){ return; }

    let currentStoreString = SlackService.getCurrentUserStoreString();

    let newStoreString = JSON.stringify(users);
    if(currentStoreString !== newStoreString){
      window.localStorage.setItem(SlackService.USER_STORE_KEY, newStoreString);
    }
  }

}
