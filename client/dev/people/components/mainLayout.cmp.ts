import {Component} from '@angular/core'
import {PeopleComponent} from "./people.cmp";
import {QuizComponent} from "./quiz.cmp";
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {LeaderboardComponent} from "./leaderboard.cmp";
import {SolnetButton} from "./solnet/solnet-button.cmp";
import {SolnetToolbar} from "./solnet/solnet-toolbar.cmp";


@Component({
  selector: 'main-layout',
  template: `
    <solnet-toolbar>
        <solnet-button [routerLink]="['/people/list']">Directory</solnet-button>
        <solnet-button [routerLink]="['/people/quiz']">Quiz</solnet-button>
        <solnet-button [routerLink]="['/people/leaderboard']">Leaderboard</solnet-button>
    </solnet-toolbar>
    
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./people/styles/app.cmp.css'],
  directives: [SolnetToolbar, SolnetButton, PeopleComponent, QuizComponent, ROUTER_DIRECTIVES]
})
@Routes([
  { path: '/list',        component: PeopleComponent},
  { path: '/quiz',        component: QuizComponent},
  { path: '/leaderboard', component: LeaderboardComponent}
])
export class MainLayoutComponent {}
