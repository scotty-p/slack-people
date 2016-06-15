import {Component, OnDestroy} from '@angular/core';
import {SlackService} from "../../services/slack.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';

import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp"
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {SOLNET_FORM_DIRECTIVES} from "../solnet/solnet-form.cmp";
import {SolnetLoader} from "../solnet/solnet-loader.cmp";
import {Router} from '@angular/router';
import {PeopleDetailComponent} from './peopleDetail.cmp';
import {User} from "../../models/user";
import {SVG_DIRECTIVES} from "../svg/index";
import {SolnetContainer} from "../solnet/solnet-container.cmp";


let keyUpBinding;

@Component({
  selector: 'people-cmp',
  styles: [`


    .top-actions {
      width: 100%;
      margin-top: 16px;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      position: relative;
      align-items: center;
    }

    .avatar-container {
      position: relative;
    }

    .user-presence {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid transparent;
        position: absolute;
        bottom: 4px;
    }

    .user-presence.active {
        border-color: #fff;
        background-color: #95C962;
    }
    .user-presence.away {
        border-color: grey;
        background-color: #fff;
    }

    .user-content-container h3 {
      transition: all 300ms ease;
      margin-top: 12px;
      margin-bottom: 2px;
    }

    .user-content-container .light {
      color: #A0ADB4;
      font-weight: 500;
    }

    .user-content-container p {
      margin-top: 0;
      font-size: 0.9em;
      font-family: 'adelle';
      font-style: italic;
    }


    .search-input {
      color: #A0ADB4;
      padding: 10px 32px 32px;
      font-size: 1.17em;
      flex-grow: 1;
      border: none;
      border-bottom: 1px solid rgb(221, 221, 221);

    }

    .search-input:focus {outline: none;}

    .search-input::-webkit-input-placeholder {
      color: #A0ADB4;
    }

    search-svg {
      display: block;
      position: absolute;
      left: 0;
      height: 22px;
      width: 22px;
      top: 11px;
    }
    
    h3, h4 {
      word-break: break-all;
    }
    
    h4 {
      margin: 6px 0;
    }
    
    h4.email {
      margin-top: 0;
    }
    
    .list-item {
      min-height: 90px;
      transition: all 300ms ease;
    }

    .list-item img {
      transition: all 300ms ease;
    }
    
    .list-item.is-active {
      min-height: 218px;
    }
    
    .list-item .avatar-container {
      width: 76px;
      transition: all 300ms ease;
    }
    .list-item.is-active .avatar-container {
      width: 202px;
    }
    .list-item.is-active img {
      height: 176px !important;
      width: 176px !important;
    }
    
    
    .list-item.is-active .user-presence {
      transform: scale(0);
    }
    .list-item .user-presence {
      transition: transform 100ms ease;
    }
    
    .user-detail-content {
      opacity: 0;
      max-height: 0;
      transition: all 150ms ease;
      transition-delay: 75ms;
      overflow: hidden;
    }
    .user-detail-content-desktop {
      overflow-y: hidden;
      position: absolute;      
    }
    .user-detail-content-mobile {
      width: 100%;
      position: relative;
      top: -40px;
      text-align: center;
    }
    
    .list-item.is-active .user-detail-content {
      opacity: 1;
      overflow: visible;
    }
    
    .list-item.is-active .user-detail-content-desktop {
      max-height: 216px;      
    }
    
    .list-item.is-active .user-content-container h3 {
      margin-top: 40px;
    }
    
    @media(min-width: 581px){            
      .user-detail-content-mobile {
        display: none;
      }
    }
    
    
    @media(max-width: 580px){
    
      .list-item.is-active {
        min-height: 250px;
      }
      
      .list-item.is-active .avatar-container {
        width: 132px;
      }
      .list-item.is-active img {
        height: 120px !important;
        width: 120px !important;
      }
      
      .user-detail-content-desktop {
        display: none;
      }
    }
    
    email-svg,
    phone-svg {
      margin-right: 4px;
    }
    
    a {
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: all 200ms ease;
    }
    
    a:hover {
      border-color: #3E5868;
    }
    

  `],
  template: `
  <solnet-container>

    <div class="top-actions">
      <search-svg></search-svg>
      <input class="search-input" [(ngModel)]="searchModel" (ngModelChange)="onSearchChange($event)" placeholder='Search staff' />
    </div>

    <solnet-loader *ngIf="! filteredUsers"></solnet-loader>

    <solnet-list>
      <solnet-list-item class="list-item {{getUserItemActiveClass(user)}}" solnet-list-item-border *ngFor="let user of filteredUsers;" (click)="selectUser($event, user)">
        <solnet-list-item-content>
          <div class="avatar-container">
            <img solnet-list-avatar class="item-sm" src="{{user.profile.image_192}}"/>
            <div class="user-presence {{user.presence}}"></div>
          </div>
          
          <div class="user-content-container">
            <h3>
              <span>{{user.profile.first_name || user.name}}</span>
              <span class="light">{{user.profile.first_name ? user.profile.last_name : '&nbsp;'}}</span>
            </h3>
            <p class="user-title light">{{user.profile.title || '&nbsp;'}}</p>
            
            <div class="user-detail-content user-detail-content-desktop">
              <a href="{{getUserEmail(user) ? 'mailto:' + getUserEmail(user) : ''}}">
                <h4 class="email"><email-svg *ngIf="getUserEmail(user)"></email-svg>{{getUserEmail(user) || '&nbsp;'}}</h4>
              </a>
              <a href="{{user.profile.phone ? 'tel:' + getTelFromUser(user) : ''}}">
                <h4 class="phone"><phone-svg *ngIf="user.profile.phone"></phone-svg>{{user.profile.phone || '&nbsp;'}}</h4>
              </a>
            </div>
          </div>
          
        </solnet-list-item-content>
        
        <div class="user-detail-content user-detail-content-mobile">
          <a href="{{getUserEmail(user) ? 'mailto:' + getUserEmail(user) : ''}}">
            <h4 class="email"><email-svg *ngIf="getUserEmail(user)"></email-svg>{{getUserEmail(user) || '&nbsp;'}}</h4>
          </a>
          <a href="{{user.profile.phone ? 'tel:' + getTelFromUser(user) : ''}}">
            <h4 class="phone"><phone-svg *ngIf="user.profile.phone"></phone-svg>{{user.profile.phone || '&nbsp;'}}</h4>
          </a>
        </div>
        
      </solnet-list-item>
    </solnet-list>

  </solnet-container>
  `,
  directives: [SOLNET_LIST_DIRECTIVES, SOLNET_FORM_DIRECTIVES, SolnetButton, SolnetLoader, PeopleDetailComponent, SVG_DIRECTIVES, SolnetContainer]

})
export class PeopleComponent implements OnDestroy {

  currentUser:User;
  searchModel:string;
  usersStream:Observable<any>;

  filteredUsers:Array<User>;

  filterObserver;
  filteredStream;

  window: any;


  constructor(private slackService:SlackService, private router:Router) {
    this.currentUser = null;

    this.usersStream = this.slackService.getUsersAsStream()
      .filter((user:any) => !user.deleted);

    this.filteredStream = new Observable(observer => this.filterObserver = observer)
      .startWith(this.searchModel || '')
      .combineLatest(this.usersStream, (filter, users) => {
        return users.filter(user => this.searchFilter(user, filter));
      }).share();

    this.filteredStream.subscribe(users => {
      this.filteredUsers = users;
    });

    this.window = window;

    keyUpBinding = this.handleKeyPress.bind(this);

    window.addEventListener('keyup', keyUpBinding);

  }

  ngOnDestroy():any{
    window.removeEventListener('keyup', keyUpBinding);
    return null;
  }

  handleKeyPress($event){

    if($event.srcElement.localName === 'input'){
      return;
    }

    if($event.key === 'Backspace'){
      this.searchModel = (this.searchModel || '').substring(0, Math.max(this.searchModel.length - 1, 0));
      this.onSearchChange();
    }
    else if(/^[a-zA-Z0-9]$/.test($event.key)){
      this.searchModel = (this.searchModel || '') + $event.key;
      this.onSearchChange();
    }

  }

  isUserItemActive(user){
    return this.currentUser && this.currentUser.id === user.id;
  }

  getUserItemActiveClass(user){
    return this.isUserItemActive(user) ? 'is-active' : '';
  }

  getUserEmail(user: any = {}){
    return user.profile && user.profile.email;
  }

  searchFilter(user, searchFilter) {
    let nameMatch = this.getNameFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;
    let titleMatch = this.getTitleFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;
    let phoneMatch = this.getPhoneFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;
    let emailMatch = this.getEmailFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;

    return searchFilter ? nameMatch || titleMatch || phoneMatch || emailMatch : true;
  }

  onSearchChange() {
    this.filterObserver.next(this.searchModel);
  }

  selectUser($event, user) {


    if($event.target.className === 'email' ||
      $event.target.className === 'phone' ||
      $event.target.nodeName === 'svg' ){
      return;
    }


    return this.currentUser = this.currentUser && this.currentUser.id === user.id ? undefined : user;
  }

  getNameFromUser(user) {
    return user.real_name || user.name || '';
  }

  getTitleFromUser(user) {
    return user && user.profile && user.profile.title || '';
  }

  getPhoneFromUser(user) {
    return user && user.profile && user.profile.phone || '';
  }
  getTelFromUser(user) {
    return user && user.profile && user.profile.phone.replace(/\s/g, '') || '';
  }

  getEmailFromUser(user) {
    return user && user.profile && user.profile.email || '';
  }

}
