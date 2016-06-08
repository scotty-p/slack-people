import {Component, OnChanges, SimpleChange} from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {SlackService} from "../services/slack.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/combineAll';


@Component({
  selector: 'person-cmp',
  templateUrl: './people/templates/person.cmp.html',
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_LIST_DIRECTIVES, MD_INPUT_DIRECTIVES]
})
export class PersonComponent implements OnChanges {

  searchModel: string;
  usersStream: Observable<any>;

  filterObserver;
  filteredStream;

  constructor(private slackService: SlackService){

    this.usersStream = this.slackService.getUsersAsStream()
        .filter(user => ! user.deleted);

    this.filteredStream = new Observable(observer => this.filterObserver = observer)
        .startWith('')
        .combineLatest(this.usersStream, (filter, users) => {
          console.log(filter, users);
          return users.filter(user => this.searchFilter(user, filter));
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
}
