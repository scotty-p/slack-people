import {Component} from '@angular/core'
import {PeopleComponent} from "./people/people.cmp";
import {QuizComponent} from "./quiz/quiz.cmp";
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';
import {SolnetButton} from "./solnet/solnet-button.cmp";
import {SolnetToolbar} from "./solnet/solnet-toolbar.cmp";
import {LeaderboardComponent} from "./quiz/leaderboard.cmp";
import {QuestionComponent} from "./quiz/question.cmp";
import {SVG_DIRECTIVES} from "./svg/index";

@Component({
  selector: 'main-layout',
  template: `
    <solnet-toolbar>
    
      <game-svg [routerLink]="['/people/quiz']"></game-svg>
      <logo-svg class="logo"></logo-svg>
      <list-svg [routerLink]="['/people/list']"></list-svg>
                
                
    </solnet-toolbar>
    
    <router-outlet></router-outlet>
  
  `,
  styles: [`
      
    .logo {
      width: 240px;
      height: 70px;
    }
    
    @media(max-width: 500px){
      .logo {
        width: 200px;
        height: 65px;
        top: 5px;
        position: relative;
      }
    }
    
    `
  ],
  directives: [SolnetToolbar, SolnetButton, ROUTER_DIRECTIVES, SVG_DIRECTIVES]
})
@Routes([
  { path: '/list',        component: PeopleComponent},
  { path: '/quiz',        component: QuizComponent},
  { path: '/leaderboard', component: LeaderboardComponent},
  { path: '/question',    component: QuestionComponent},
])
export class MainLayoutComponent {}
