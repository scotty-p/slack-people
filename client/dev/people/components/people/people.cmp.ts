import {Component} from '@angular/core';
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


@Component({
  selector: 'people-cmp',
  styles: [`
  
    
    .top-actions {
      margin-top: 16px;
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
    
    .list-item {
      min-height: 90px;
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
  
  `],
  template: `

  <div class="top-actions">
    <search-svg></search-svg>
    <input class="search-input" [(ngModel)]="searchModel" (ngModelChange)="onSearchChange($event)" placeholder='Search staff' />    
  </div>
    
    <solnet-loader *ngIf="! filteredUsers"></solnet-loader>
        
    <solnet-list>
      <solnet-list-item class="list-item" solnet-list-item-border *ngFor="let user of filteredUsers;" (click)="selectUser(user)">
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
          </div>
        </solnet-list-item-content>
        <solnet-list-item-detail *ngIf="currentUser && currentUser.id === user.id">
          <people-detail [user]="user"></people-detail>
        </solnet-list-item-detail>
      </solnet-list-item>
    </solnet-list>
  `,
  directives: [SOLNET_LIST_DIRECTIVES, SOLNET_FORM_DIRECTIVES, SolnetButton, SolnetLoader, PeopleDetailComponent, SVG_DIRECTIVES]

})
export class PeopleComponent {
  currentUser:User;
  searchModel:string;
  usersStream:Observable<any>;

  filteredUsers:Array<User>;

  filterObserver;
  filteredStream;


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

  }
  searchFilter(user, searchFilter) {
    let nameMatch = this.getNameFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;
    let titleMatch = this.getTitleFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;
    let phoneMatch = this.getPhoneFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;
    let emailMatch = this.getEmailFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;

    return searchFilter ? nameMatch || titleMatch || phoneMatch || emailMatch : true;
  }

  onSearchChange($event) {
    this.filterObserver.next(this.searchModel);
  }

  selectUser(user) {
    this.currentUser = user;
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

  getEmailFromUser(user) {
    return user && user.profile && user.profile.email || '';
  }

}
