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
  static userStore: User[] = SlackService.getCurrentUserStore();
  static usersObservable: Observable<User[]>;
  static usersObserver: Observer<User[]>;

  constructor(private http:Http, private router:Router, private authService:AuthService) {
    let windowObj: any = window;
    windowObj.wipeUsers = () => window.localStorage.removeItem(SlackService.USER_STORE_KEY);
  }

  authorise(code:string) {
    let redirectUrl = `${window.location.origin}/auth/callback`;
    return this.http
      .get('auth/authenticate?code='+code + '&redirect_uri='+redirectUrl)
      .map(resp => resp.json())
      .toPromise();
  }

  getRtmStartAsPromise(): any {
    return this.http
        .get(`${this.url}/rtm.start?token=${this.authService.getAccessToken()}`)
        .map(resp => resp.json())
        .toPromise();
  }

  exit(){
    this.authService.logout();
    return this.router.navigate(['/login']);
  }

  initRtmStart(){
    return this.getRtmStartAsPromise()
      .catch((err: any) => {
        console.log('Error getting stream', err, err.status);

        if(SlackService.userStore.length > 0){
          console.log('using user store cache and retrying in 30seconds');
          //retry to init in 30000
          setTimeout(() => this.initRtmStart(), 30000);
          return {
            ok: true,
            users: SlackService.userStore
          };
        }
        else {
          console.log('logging user out');
          this.exit();
          throw err;
        }
      })
      .then((rtmStart) => this.initRtmUsersSocket(rtmStart))
      .then((rtmStart) => {
        let users = rtmStart.users.map(user => {
          user.profile.email = user.profile.email ? user.profile.email.replace('solnetsolutions', 'solnet') : '';
          return user;
        }).filter(user => {
          return ! user.deleted &&
            user.name.toLowerCase().indexOf('slackbot') === -1 &&
            user.name.toLowerCase().indexOf('workbot') === -1 &&
            user.name.toLowerCase().indexOf('trello') === -1 &&
            (user.name.toLowerCase().indexOf('nextup') === -1 && user.name.toLowerCase().indexOf('jira') === -1) &&
            user.name.toLowerCase().indexOf('support') === -1;
        });
        SlackService.usersObserver.next(users);
      });
  }

  initRtmUsersSocket(rtmStart: any){
    if(! rtmStart.ok){
      console.log('Error with rtm start response - logging user out', rtmStart);
      return this.exit();
    }

    if(rtmStart.url){
      this.connectToSocket(rtmStart.url);
    }

    return rtmStart;
  }

  connectToSocket(url){

    if(this.socket){
      try{
        this.socket.close();
      }
      catch(err){
        console.error('Error closing socket', err);
      }
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = (...params:any[]) => {};

    this.socket.onclose = () => this.initRtmStart();

    this.socket.onmessage = (message: any = {}) => {

      let messageData = message.data && JSON.parse(message.data) || {};

      if(messageData.type === 'reconnect_url'){
        // Not used?
        // return this.connectToSocket(messageData.url);
      }
      else if(messageData.type === 'team_join'){
        SlackService.userStore.push(messageData.user);
        return SlackService.usersObserver.next(SlackService.userStore);
      }
      else if(messageData.type === 'presence_change'){
        let user = SlackService.userStore.find(user => user.id === messageData.user);
        if(user){
          user.presence = messageData.presence;
          return SlackService.usersObserver.next(SlackService.userStore);
        }
      }
      else if(messageData.type === 'user_change'){
        let user = SlackService.userStore.find(user => user.id === messageData.user.id);
        if(user){
          Object.assign(user, messageData.user);
          return SlackService.usersObserver.next(SlackService.userStore);
        }
      }
    };
  }

  getUsersAsStream(){

    if( ! SlackService.usersObservable ){

      SlackService.usersObservable = new Observable<User[]>(observer => SlackService.usersObserver = observer).share();
      SlackService.usersObservable.subscribe(users => SlackService.updateUserStore(users));

      this.initRtmStart();
    }

    if(SlackService.userStore.length > 0){
      setTimeout(() => SlackService.usersObserver.next(SlackService.userStore), 0);
      setTimeout(() => {
        if(SlackService.userStore.length > 0) {
          SlackService.usersObserver.next(SlackService.userStore)
        }
      }, 32);
    }

    return SlackService.usersObservable;
  }


  static getCurrentUserStore(){

    try {
      let currentStoreString = SlackService.getCurrentUserStoreString();
      let currentStore = JSON.parse(currentStoreString);
      return currentStore instanceof Array ? JSON.parse(currentStoreString) : [];
    }
    catch(err){
      console.error('Error getting current user store', err);
      return [];
    }
  }

  static getCurrentUserStoreString(){
    return window.localStorage.getItem(SlackService.USER_STORE_KEY);
  }

  static updateUserStore(users: User[]) {

    if(! users || users.length === 0){ return; }

    SlackService.userStore = users;
    let currentStoreString = SlackService.getCurrentUserStoreString();

    let newStoreString = JSON.stringify(users);
    if(currentStoreString !== newStoreString){
      window.localStorage.setItem(SlackService.USER_STORE_KEY, newStoreString);
    }
  }

}
