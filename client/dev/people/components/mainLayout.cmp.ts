import {Component} from '@angular/core'
// import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar'
// import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button";
import {PeopleComponent} from "./people.cmp";
import {QuizComponent} from "./quiz.cmp";
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {LeaderboardComponent} from "./leaderboard.cmp";


@Component({
  selector: 'main-layout',
  templateUrl: './people/templates/mainLayout.cmp.html',
  styleUrls: ['./people/styles/app.cmp.css'],
  directives: [PeopleComponent, QuizComponent, ROUTER_DIRECTIVES]
})
@Routes([
  { path: '/list',        component: PeopleComponent},
  { path: '/quiz',        component: QuizComponent},
  { path: '/leaderboard', component: LeaderboardComponent}
])
export class MainLayoutComponent {}
