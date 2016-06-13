import {Component} from '@angular/core';
import {SlackService} from "../services/slack.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {SOLNET_LIST_DIRECTIVES} from "./solnet/solnet-list.cmp";
import {SolnetButton} from "./solnet/solnet-button.cmp";
import {SolnetInput} from "./solnet/solnet-input";
import {SolnetLoader} from "./solnet/solnet-loader.cmp";


@Component({
  selector: 'people-cmp',
  styles: [`
  
    .top-actions input {
      flex-grow: 1;
      padding: 10px;
      
    }
    .top-actions {
      margin-bottom: 16px;
      display: flex;
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
    .user-content-container p {
      margin-top: 0;
      color: #888;
      font-size: 0.9em;
    }
    
    .list-item {
      min-height: 90px;
    }
  
  `],
  template: `

  <div class="top-actions">
    <input class="search-input" [(ngModel)]="searchModel" (ngModelChange)="onSearchChange($event)" placeholder='Search staff' />
  </div>
    
    
    <solnet-loader *ngIf="! filteredUsers"></solnet-loader>

    <solnet-list>
        <solnet-list-item class="list-item" solnet-list-item-border *ngFor="let user of filteredUsers">
    
          <div class="avatar-container">
            <img solnet-list-avatar src="{{user.profile.image_192}}"/>
            <div class="user-presence {{user.presence}}"></div>
          </div>    
    
          <div class="user-content-container">
            <h3>{{user.real_name || user.name}}</h3>
            <p>{{user.profile.phone || '&nbsp;'}}</p>
          </div>
          
      </solnet-list-item>
    </solnet-list>
      
  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton, SolnetInput, SolnetLoader]
})
export class PeopleComponent {

  searchModel:string;
  usersStream:Observable<any>;

  filteredUsers:any[];

  filterObserver;
  filteredStream;

  constructor(private slackService:SlackService) {

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


  getNameFromUser(user) {
    return user.real_name || user.name || '';
  }

  searchFilter(user, searchFilter) {
    return searchFilter ? this.getNameFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 : true;
  }

  onSearchChange($event) {
    this.filterObserver.next(this.searchModel);
  }

}
