import {Component} from '@angular/core';
import {RouteSegment, RouteTree, ROUTER_DIRECTIVES, OnActivate, Routes} from '@angular/router';
import {SlackService} from "../services/slack.service";
import {AuthCallbackComponent} from "./authCallbackComponent";

@Component({
  selector: 'auth-cmp',
  templateUrl: './people/templates/auth.cmp.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [SlackService],
})
@Routes([
  {path: '/callback', component: AuthCallbackComponent}
])
export class AuthComponent implements OnActivate {
  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    console.log('routerOnActivate', currTree);
  }

  users:Array<any>;
  showPerson:boolean = true;

  constructor(private slackService:SlackService) {
    this.users = [];

    // this.slackService.findAllUsers()
    //   .then((resp) => this.users = resp);
  }

}
