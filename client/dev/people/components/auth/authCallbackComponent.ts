import {Component} from '@angular/core';
import {RouteSegment, OnActivate, RouteTree, Router} from '@angular/router';
import {SlackService} from "../../services/slack.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'auth-callback',
  template: '',
  providers: [SlackService, AuthService]
})
export class AuthCallbackComponent implements OnActivate {

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    let params: any = curr.parameters;
    if(params.code) {
      this.slackService.authorise(params.code)
        .then((resp:any) => {
          if(resp.access_token) {
            // store in localStorage
            this.authService.setAccessToken(resp.access_token);
            this.router.navigate(['/people/list'])
          } else {
            console.log('Something went wrong receiving the access token.')
          }
        })
        .catch((err) => console.log(err.json()));
    }
  }

  constructor(
    private slackService:SlackService,
    private authService:AuthService,
    private router:Router) {  }
}
