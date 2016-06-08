import {Component} from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list';
import {SlackService} from "../services/slack.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';


@Component({
  selector: 'people-cmp',
  styleUrls: ['./people/styles/people.cmp.css'],
  templateUrl: './people/templates/people.cmp.html',
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_LIST_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES]
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
