import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {MainLayoutComponent} from "./mainLayout.cmp";
import {AuthService} from "../services/auth.service";
import {SlackService} from "../services/slack.service";
import {QuizService} from "../services/quiz.service";
import {AuthCallbackComponent} from "./auth/authCallbackComponent";
import {LoginComponent} from "./auth/login.cmp";

@Component({
  selector: 'app-cmp',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers: [SlackService, QuizService]
})
export class AppComponent implements OnInit {

  ngOnInit(): any {
    // this.validateRoutes();
  }

  // validateRoutes(){
  //
  //   if(this.authService.isAuthorised()) {
  //     console.log('You have an access token.');
  //
  //     if( ! this.isPeopleActive() && ! this.isQuizActive() && !this.isSupportActive()){
  //       this.router.navigate(['/people/quiz']);
  //     }
  //   }
  //   else {
  //     console.log('You don\'t have an access token.');
  //     if( ! this.isAuthActive() ){
  //       this.router.navigate(['/login']);
  //     }
  //   }
  // }


  isQuizActive(){
    return this.isRouteActive(['/people/quiz']) ||
    this.isRouteActive(['/people/question']) ||
    this.isRouteActive(['/people/leaderboard'])
  }

  isSupportActive() {
    return this.isRouteActive(['/support']);
  }

  isAuthActive(){
    return window.location.pathname.indexOf('auth') !== -1;
  }

  isPeopleActive(){
    return this.isRouteActive(['/people/list']);
  }

  isRouteActive(route){
    // return this.router.urlTree.contains(this.router.createUrlTree(route));
  }

  constructor(private router: Router, private authService:AuthService) { }
}
