import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router, OnActivate, RouteTree, RouteSegment} from '@angular/router';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button'
import {AuthComponent} from "./auth.cmp";
import {PeopleComponent} from "./people.cmp";
import {AuthService} from "../services/auth.service";
import {SlackService} from "../services/slack.service";

@Component({
  selector: 'app-cmp',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./people/styles/app.cmp.css'],
  directives: [ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES],
  providers: [AuthService, SlackService]
})
@Routes([
  { path: '/auth',          component: AuthComponent},
  { path: '/',              component: PeopleComponent}
])
export class AppComponent implements OnActivate, OnInit {

  ngOnInit(): any {
    if(this.authService.isAuthorised()) {
      console.log('You have an access token.');
      this.router.navigate(['/']);
    } else {
      console.log('You do not have an access token.');
      this.router.navigate(['/auth']);
    }
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    console.log(prevTree)
  }

  constructor(private router:Router, private authService:AuthService) {}
}
