import {Component} from '@angular/core'
import {PeopleComponent} from "./people/people.cmp";
import {PeopleDetailComponent} from "./people/peopleDetail.cmp";
import {QuizComponent} from "./quiz/quiz.cmp";
import {RouteSegment, OnActivate, ROUTER_DIRECTIVES, Routes, RouteTree, Router} from '@angular/router';
import {SolnetButton} from "./solnet/solnet-button.cmp";
import {SolnetToolbar} from "./solnet/solnet-toolbar.cmp";
import {LeaderboardComponent} from "./quiz/leaderboard.cmp";
import {QuestionComponent} from "./quiz/question.cmp";
import {SVG_DIRECTIVES} from "./svg/index";


@Component({
  selector: 'main-layout',
  template: `
    <solnet-toolbar>
    
      <game-svg class="link" [routerLink]="['/people/quiz']"></game-svg>
      <logo-svg class="logo"></logo-svg>
      <list-svg class="link" [routerLink]="['/people/list']"></list-svg>
                
                
    </solnet-toolbar>
    
    <router-outlet></router-outlet>
  
  `,
  styles: [`
  
    solnet-toolbar {
      z-index: 100;
      position: relative;
      display: block;
    }
      
    .logo {
      width: 160px;
    }
    
    .link {
      cursor: pointer;
      height: 30px;
      width: 30px;
      display: inline-block;
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
