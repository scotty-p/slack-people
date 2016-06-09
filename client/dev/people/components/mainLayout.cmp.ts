import {Component} from '@angular/core'
// import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar'
// import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button";
import {PeopleComponent} from "./people.cmp";
import {QuizComponent} from "./quiz.cmp";
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {LeaderboardComponent} from "./leaderboard.cmp";


@Component({
  selector: 'main-layout',
  template: `
  
  <div>
    <div class="toolbar">
      <div class="logo" alt="Solnet logo"></div>
      <div class="fill-toolbar-gap"></div>
    
      <div>
        <a [routerLink]="['/people/list']">
          <button>Directory</button>
        </a>
        <a [routerLink]="['/people/quiz']">
          <button>Quiz</button>
        </a>
        <a [routerLink]="['/people/leaderboard']">
          <button>Leaderboard</button>
        </a>
      </div>
    
    </div>
    
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  </div>
`,
  styleUrls: ['./people/styles/app.cmp.css'],
  directives: [PeopleComponent, QuizComponent, ROUTER_DIRECTIVES]
})
@Routes([
  { path: '/list',        component: PeopleComponent},
  { path: '/quiz',        component: QuizComponent},
  { path: '/leaderboard', component: LeaderboardComponent}
])
export class MainLayoutComponent {}
