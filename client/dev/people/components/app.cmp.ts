import {Component, OnInit} from '@angular/core';
import {RouteSegment, OnActivate, ROUTER_DIRECTIVES, Routes, RouteTree, Router} from '@angular/router';
import {AuthComponent} from "./auth.cmp";
import {MainLayoutComponent} from "./mainLayout.cmp";
import {AuthService} from "../services/auth.service";
import {SlackService} from "../services/slack.service";
import {QuizComponent} from "./quiz.cmp";
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-cmp',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService, SlackService, QuizService]
})
@Routes([
  { path: '/auth',          component: AuthComponent},
  { path: '/people',        component: MainLayoutComponent}
])
export class AppComponent implements OnInit, OnActivate {

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    this.validateRoutes();
  }

  ngOnInit(): any {
    this.validateRoutes();
  }

  validateRoutes(){
    if(this.authService.isAuthorised()) {
      console.log('You have an access token.');

      if( ! this.isPeopleActive()){
        this.router.navigate(['/people/list']);
      }
    } else {
      console.log('You do not have an access token.');
      this.router.navigate(['/auth']);
    }
  }

  isPeopleActive(){
    return this.isRouteActive(['/people/quiz']) ||
      this.isRouteActive(['/people/list']) ||
      this.isRouteActive(['/people/leaderboard']);
  }

  isRouteActive(route){
    return this.router.urlTree.contains(this.router.createUrlTree(route));
  }

  constructor(private router:Router, private authService:AuthService) { }
}
