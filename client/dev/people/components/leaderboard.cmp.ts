import {Component} from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import {SlackService} from "../services/slack.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../services/quiz.service";



@Component({
  selector: 'leaderboard-cmp',
  styles: [''],
  template: `

      <md-list>
        <md-list-item *ngFor="let leader of leaderboard">
          <img md-list-avatar src="{{leader.profile.image_192}}"/>
    
          <h3 md-line>{{leader.real_name || leader.name}}</h3>
    
          <p md-line>{{leader.score}}</p>    
        </md-list-item>
      </md-list>
  `,
  directives: [MD_CARD_DIRECTIVES, MD_PROGRESS_CIRCLE_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_LIST_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES]
})
export class LeaderboardComponent {

  leaderboard: any;

  constructor(private quizService: QuizService){

    this.quizService.getLeaderBoard()
      .subscribe(leaderboard => {
        this.leaderboard = leaderboard.sort((a, b) => {
          return a.score < b.score;
        });
      });

  }

}
