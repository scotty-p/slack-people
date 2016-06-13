import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetLoader} from "../solnet/solnet-loader.cmp";
import {SolnetContainer} from "../solnet/solnet-container.cmp";



@Component({
  selector: 'leaderboard-cmp',
  styles: [`

    .position {
      margin-right: 24px;
    }

  `],
  template: `


    <solnet-container>

      <h1>Leaderboard</h1>

      <solnet-loader *ngIf="! leaderboard"></solnet-loader>

      <solnet-list>
        <solnet-list-item *ngFor="let leader of leaderboard; let i = index">

          <h1 class="position">{{i + 1}}</h1>

          <img solnet-list-avatar src="{{leader.profile.image_192}}"/>

          <div>
            <h3>{{leader.real_name || leader.name}} ({{leader.score}})</h3>
          </div>

        </solnet-list-item>
      </solnet-list>
    </solnet-container>
  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetLoader, SolnetContainer]
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
