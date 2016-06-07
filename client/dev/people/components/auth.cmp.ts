import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';
import {SlackService} from "../services/slack.service";
import {AuthCallbackComponent} from "./authCallbackComponent";

@Component({
  selector: 'auth-cmp',
  templateUrl: './people/templates/auth.cmp.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [SlackService],
})
@Routes([
  {path: '/callback/:code', component: AuthCallbackComponent}
])
export class AuthComponent {
  users:Array<any>;
  showPerson:boolean = true;

  constructor(private slackService:SlackService) {
    this.users = [];
  }

}
