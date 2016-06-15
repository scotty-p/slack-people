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
    
    .leaderboard-container {
      text-align: center;
    }
    .leaderboard-container h5 {
      font-family: 'adelle';
      font-style: italic;
      font-weight: 300;
      color: #b1c8db;
    }
    
    .leaderboard-container h4 {
      color: #fff;
    }
    
    .leaderboard-container solnet-button{
      margin-bottom: 32px;
    }
    
    .points {
      color: rgb(14, 88, 158);
      font-weight: 300;
    }
    
    .list-item {
      padding: 0 20px;
    }
    
    .list-item.list-item-odd {
      background-color: rgb(248, 248, 248);
    }
    
  `],
  template: `


    <div class="leaderboard-container">
      <solnet-container>
        <game-svg></game-svg>
        <h5>WhosWho Leaderboard</h5>
        
        <div *ngIf="currentScore" style="margin-bottom: 20px;">
          <div *ngIf="hasCurrentScore()">
            <h4>Your current score {{currentScore.currentScore}}</h4>
            <solnet-button [routerLink]="['/people/question']">Carry on playing!</solnet-button>        
          </div>
          <div *ngIf="hasNewBestScore()">
            <h4>You got a new personal best of {{currentScore.previousScore}}</h4>
            <solnet-button [routerLink]="['/people/question']">Play again</solnet-button>
          </div>
          <div *ngIf="hasNewScore()">
            <h4 style="margin-bottom: 0;">You got a score of {{currentScore.previousScore}}</h4>
            <h4 style="margin-top: 0;">Not quite as good as your best of {{currentScore.score}}</h4>
            <solnet-button [routerLink]="['/people/question']">Play again</solnet-button>
          </div>
          <div *ngIf="hasNotPlayed()">
              <solnet-button [routerLink]="['/people/question']">Play your first game</solnet-button>
          </div>        
        </div>
        
      </solnet-container>
    </div>
    
    <solnet-container>

      <solnet-loader *ngIf="! leaderboard"></solnet-loader>

      <solnet-list *ngIf="leaderboard">
        <solnet-list-item class="list-item {{o ? 'list-item-odd' : ''}}" *ngFor="let leader of leaderboard; let i = index; let o = odd;">
        
          <h1 class="position light">{{i + 1}}</h1>

          <img solnet-list-avatar src="{{leader.profile.image_192}}" *ngIf="leader && leader.profile && leader.profile.image_192" />
          
          <h3 class="leader-board-name">
            <span>{{leader.profile.first_name || leader.name}}</span>
            <span class="light">{{leader.profile.first_name ? leader.profile.last_name : '&nbsp;'}}</span>
          </h3>
        
          <div>
            <h4 class="points">{{leader.score}}pts</h4>
          </div>

        </solnet-list-item>
      </solnet-list>
    </solnet-container>
  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton, ROUTER_DIRECTIVES, SolnetLoader, SolnetContainer, SVG_DIRECTIVES]
})
export class LeaderboardComponent {

  leaderboard: any;
  currentScore: any;

  constructor(private quizService: QuizService){

    this.quizService.getLeaderBoard()
      .subscribe(leaderboard => {
        console.log('Leaderboard', leaderboard);
        this.leaderboard = leaderboard.leaderboards;
        this.currentScore = leaderboard.currentScore;
      });
  }

  hasCurrentScore(){
    return this.currentScore.currentScore > 0;
  }

  hasNewBestScore(){
    return ! this.hasCurrentScore() &&
      this.currentScore.score === this.currentScore.previousScore;
  }
  hasNewScore(){
    return ! this.hasCurrentScore() && !! this.currentScore.previousScore &&
      this.currentScore.score !== this.currentScore.previousScore;
  }

  hasNotPlayed(){
    return ! this.hasCurrentScore() && ! this.currentScore.previousScore;
  }

}
