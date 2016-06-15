import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetLoader} from "../solnet/solnet-loader.cmp";
import {SolnetContainer} from "../solnet/solnet-container.cmp";
import {SVG_DIRECTIVES} from "../svg/index";
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {ROUTER_DIRECTIVES} from '@angular/router'


@Component({
  selector: 'leaderboard-cmp',
  styles: [`

    .position {
      margin-right: 24px;
    }
    .leader-board-name {
        text-transform: capitalize;
        flex-grow: 1;
    }

    img {
      margin-right: 12px;
    }

    .light {
      color: #A0ADB4;
      font-weight: 500;
    }
    
    .leaderboard-container {
      border-top: 1px solid #A0ADB4;
      background: #3E5868;
      width: 100%;
      min-height: 80px;
    }
    
    game-svg {
      height: 40px;
      width: 40px;
    }
    
    h5 {
      font-family: 'adelle';
      font-style: italic;
      font-weight: 300;
      color: #b1c8db;
    }
    
  `],
  template: `


    <div class="leaderboard-container">
      <solnet-container>
        <game-svg></game-svg>
        <h5>WhosWho Leaderboard</h5>
        
        <solnet-button [routerLink]="['/people/question']">Play again</solnet-button>
      </solnet-container>
    </div>
    
    <solnet-container>

      <solnet-loader *ngIf="! leaderboard"></solnet-loader>

      <solnet-list>
        <solnet-list-item *ngIf="leader && leader.profile && leader.profile.image_192" *ngFor="let leader of leaderboard; let i = index">

          <h1 class="position">{{i + 1}}</h1>

          <img solnet-list-avatar src="{{leader.profile.image_192}}"/>

          <!--<div>-->
            <h3 class="leader-board-name">
              <span>{{leader.profile.first_name || leader.name}}</span>
              <span class="light">{{leader.profile.first_name ? leader.profile.last_name : '&nbsp;'}}</span>
            </h3>
          <!--</div>-->
          
          <div>
            <h4>{{leader.score}}pts</h4>
          </div>

        </solnet-list-item>
      </solnet-list>
    </solnet-container>
  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton, ROUTER_DIRECTIVES, SolnetLoader, SolnetContainer, SVG_DIRECTIVES]
})
export class LeaderboardComponent {

  leaderboard: any;

  constructor(private quizService: QuizService){

    this.quizService.getLeaderBoard()
      .subscribe(leaderboard => {
        console.log('Leaderboard', leaderboard);
        this.leaderboard = leaderboard;
      });

  }

}
