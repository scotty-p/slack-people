import {Component} from '@angular/core';
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
  directives: []
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
