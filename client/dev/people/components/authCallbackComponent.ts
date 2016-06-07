import {Component} from '@angular/core';
import {RouteSegment, OnActivate, RouteTree} from '@angular/router';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button'
import {SlackService} from "../services/slack.service";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'auth-callback',
  template: '<md-button (click)="confirm()" class="md-raised md-primary">Start</md-button>',
  directives: [MD_BUTTON_DIRECTIVES],
  providers: [SlackService, AuthService]
})
export class AuthCallbackComponent implements OnActivate {
  code:string;

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {

    let params: any = curr.parameters;
    if(params.code) {
      this.code = params.code;
    }
  }

  constructor(
    private slackService:SlackService,
    private authService:AuthService) {
    console.log('AuthCallbackComponent')
  }

  confirm() {
    this.slackService.authorise(this.code)
      .then((resp: any) => {
        console.log('authorise', resp);

        // store in localStorage
        this.authService.setAccessToken(resp.access_token);
      })
      .catch((err) => console.log(err.json()));
  }
}
