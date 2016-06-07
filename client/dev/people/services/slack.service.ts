import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
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
import {ROUTER_DIRECTIVES, Routes, Router, OnActivate, RouteTree, RouteSegment} from '@angular/router';


@Injectable()
export class SlackService {
  private url:string = 'https://slack.com/api';
  private clientId:string = '2194929392.48648557733';
  private clientSecret:string = '4390442a33a0cfad285f51f3cb6911b3';


  static USER_STORE_KEY: string = 'USER_STORE_KEY';
  private userStore: User[] = this.getCurrentUserStore();
  private usersObservable: Observable<User[]>;
  private usersObserver: Observer<User[]>;

  constructor(private http:Http, private router:Router, private authService:AuthService) { }

  authorise(code:string) {
    return this.http
      .get(this.url + '/oauth.access?client_id='+ this.clientId + '&client_secret='+ this.clientSecret +'&code='+code)
      .map(resp => resp.json())
      .toPromise();
  }

  findAllUsers() {
    return this.http
      .get(this.url + '/users.list')
      .map(resp => resp.json())
      .toPromise();
  }

  getRtmStartAsStream(){
    return this.http
        .get(`${this.url}/rtm.start?token=${this.authService.getAccessToken()}`)
        .map(resp => resp.json())
        .catch((err: Error) => {
          console.log('Error getting stream - logging user out', err);
          this.exit();
          throw err;
        })
        .share();
  }

  exit(){
    this.authService.logout();
    return this.router.navigate(['/auth']);
  }

  initRtmUsersSocket(rtmStartObservable: Observable<any>){
    return rtmStartObservable.subscribe(rtmStart => {


      if(!rtmStart.ok){
        console.log('Error with rtm start response - logging user out', rtmStart);
        return this.exit();
      }

      let socket = new WebSocket(rtmStart.url);

      socket.onopen = (...params:any[]) => {
        console.log('Socket OPEN', params)
      };

      socket.onmessage = (message: any = {}) => {

        let messageData = message.data && JSON.parse(message.data) || {};
        console.log('New event', messageData);

        //TODO listen to new / removed user event

        if(messageData.type === 'presence_change'){
          let user = this.userStore.find(user => user.id === messageData.user);
          user.presence = messageData.presence;
          this.usersObserver.next(this.userStore);
        }

      };

    });
  }

  getUsersAsStream(){

    if( ! this.usersObservable ){

      let rtmStartObservable = this.getRtmStartAsStream();

      this.initRtmUsersSocket(rtmStartObservable);

      this.usersObservable = Observable.merge(
          new Observable(observer => this.usersObserver = observer).share(),
          rtmStartObservable.map(rtmStart => rtmStart.users)
      );

      this.usersObservable.subscribe(this.updateUserStore);
    }

    if(this.userStore.length > 0){
      setTimeout(() => this.usersObserver.next(this.userStore));
    }

    return this.usersObservable;
  }


  getCurrentUserStore(){
    try{
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

type User = {
  id: string;
  team_id: string;
  name: string;
  color: string;
  real_name: string;

  presence:string;
  tz: string;
  tz_label: string;
  tz_offset: number;
  profile: UserProfile;
}

type UserProfile = {

  first_name:string;
  last_name:string;
  skype:string;
  phone:string;
  title:string;
  avatar_hash:string;
  real_name:string;
  real_name_normalized:string;
  email:string;
  image_24:string;
  image_32:string;
  image_48:string;
  image_72:string;
  image_192:string;
  image_512:string;

}
