import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {AuthComponent} from "./auth.cmp";
import {MainLayoutComponent} from "./mainLayout.cmp";
import {AuthService} from "../services/auth.service";
import {SlackService} from "../services/slack.service";
import {QuizComponent} from "./quiz.cmp";
import {QuizService} from "../services/quiz.service";
import {MainLayoutComponent} from "./mainLayout.cmp";

@Component({
  selector: 'app-cmp',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService, SlackService, QuizService]
})
@Routes([
  { path: '/auth',          component: AuthComponent},
  { path: '/',              component: MainLayoutComponent},
  { path: '/quiz',          component: QuizComponent}
])
export class AppComponent implements OnInit {

  ngOnInit(): any {
    if(this.authService.isAuthorised()) {
      console.log('You have an access token.');
      // this.router.navigate(['/']);
    } else {
      console.log('You do not have an access token.');
      this.router.navigate(['/auth']);
    }
  }

  constructor(private router:Router, private authService:AuthService) { }
}
