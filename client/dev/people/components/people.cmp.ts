import {Component, Directive, ElementRef} from '@angular/core';
import {SlackService} from "../services/slack.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {SOLNET_LIST_DIRECTIVES} from "./solnet/solnet-list.cmp";
import {SolnetButton} from "./solnet/solnet-button.cmp";


@Component({
  selector: 'people-cmp',
  styles: [`
  
    .top-actions input {
      flex-grow: 1;
      padding: 10px;
      margin-right: 12px;
    }
    .top-actions {
      display: flex;
      align-items: center;
    }
    
    .user-presence {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid transparent;
        flex-shrink: 0;
    }
    
    .user-presence.active {
        border-color: green;
        background-color: green
    }
    .user-presence.away {
        border-color: grey;
    }
    
    .grid-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Roboto, "Helvetica Neue", sans-serif;
    }
    .grid-container img {
        width: 60%;
    }

  
  `],
  template: `


  <div class="top-actions">
    <input class="search-input" [(ngModel)]="searchModel" (ngModelChange)="onSearchChange($event)" placeholder='Search staff' />
    <solnet-button (click)="onSwitchViewClick($event)">Change view</solnet-button>
  </div>
    
    
    <solnet-list *ngIf="showList">
        <solnet-list-item *ngFor="let user of filteredUsers">
        
          <img solnet-list-avatar src="{{user.profile.image_192}}"/>
    
          <div>
            <h3>{{user.real_name || user.name}}</h3>
            <p>{{user.profile.phone || '&nbsp;'}}</p>
          </div>
          
          <div class="user-presence {{user.presence}}"></div>
    
      </solnet-list-item>
    </solnet-list>
    
      
  <md-grid-list cols="3" *ngIf=" ! showList ">
    <md-grid-tile *ngFor="let user of filteredUsers">
      <div class="grid-container">
        <img src="{{user.profile.image_192}}"/>

        <h3>{{user.real_name || user.name}}</h3>
      </div>

    </md-grid-tile>
  </md-grid-list>

  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton]
})
export class PeopleComponent {

  searchModel:string;
  usersStream:Observable<any>;

  filteredUsers:any[];

  filterObserver;
  filteredStream;

  showList:boolean = true;

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

  onSwitchViewClick() {
    this.showList = !this.showList;
  }

}
