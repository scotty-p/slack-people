import {Component} from '@angular/core';
import {SlackService} from "../services/slack.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';


@Component({
  selector: 'people-cmp',
  styleUrls: ['./people/styles/people.cmp.css'],
  template: `

  <input class="search-input" [(ngModel)]="searchModel" (ngModelChange)="onSearchChange($event)" placeholder='Search staff' />

  <button (click)="onSwitchViewClick($event)">Change view</button>

  <md-list *ngIf="showList">
    <md-list-item *ngFor="let user of filteredUsers">

      <img md-list-avatar src="{{user.profile.image_192}}"/>

      <h3 md-line>{{user.real_name || user.name}}</h3>

      <p md-line>{{user.profile.phone}}</p>

      <div class="user-presence {{user.presence}}"></div>

    </md-list-item>
  </md-list>


  <md-grid-list cols="3" *ngIf=" ! showList ">
    <md-grid-tile *ngFor="let user of filteredUsers">
      <div class="grid-container">
        <img src="{{user.profile.image_192}}"/>

        <h3>{{user.real_name || user.name}}</h3>
      </div>

    </md-grid-tile>
  </md-grid-list>

  `,
  directives: []
})
export class PeopleComponent {

  searchModel: string;
  usersStream: Observable<any>;

  filteredUsers: any[];

  filterObserver;
  filteredStream;

  showList: boolean = true;

  constructor(private slackService: SlackService){

    this.usersStream = this.slackService.getUsersAsStream()
        .filter((user: any) => ! user.deleted);

    this.filteredStream = new Observable(observer => this.filterObserver = observer)
        .startWith(this.searchModel || '')
        .combineLatest(this.usersStream, (filter, users) => {
          return users.filter(user => this.searchFilter(user, filter));
        }).share();

    this.filteredStream.subscribe(users => {
      this.filteredUsers = users;
    });

  }


  getNameFromUser(user){
    return user.real_name || user.name || '';
  }

  searchFilter(user, searchFilter){
    return searchFilter ? this.getNameFromUser(user).toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 : true;
  }

  onSearchChange($event){
    this.filterObserver.next(this.searchModel);
  }

  onSwitchViewClick() {
    this.showList = ! this.showList;
  }

}
