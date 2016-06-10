import {Component} from '@angular/core'
import {PeopleComponent} from "./people.cmp";
import {QuizComponent} from "./quiz/quiz.cmp";
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {SolnetButton} from "./solnet/solnet-button.cmp";
import {SolnetToolbar} from "./solnet/solnet-toolbar.cmp";
import {LeaderboardComponent} from "./quiz/leaderboard.cmp";
import {QuestionComponent} from "./quiz/question.cmp";


@Component({
  selector: 'main-layout',
  template: `
    <solnet-toolbar>
        <solnet-button [routerLink]="['/people/list']">Directory</solnet-button>
        <solnet-button [routerLink]="['/people/quiz']">Play</solnet-button>
    </solnet-toolbar>
    
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `.app-container {
      display: flex;
      flex-direction: column;
      max-width: 500px;
      margin: 0 auto;
      padding-top: 100px;
    }`
  ],
  directives: [SolnetToolbar, SolnetButton, PeopleComponent, QuizComponent, ROUTER_DIRECTIVES]
})
@Routes([
  { path: '/list',        component: PeopleComponent},
  { path: '/quiz',        component: QuizComponent},
  { path: '/leaderboard', component: LeaderboardComponent},
  { path: '/question',    component: QuestionComponent},
])
export class MainLayoutComponent {}
