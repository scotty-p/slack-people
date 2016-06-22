import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SlackService} from "../../services/slack.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'auth-callback',
  template: '',
  providers: [SlackService, AuthService]
})
export class AuthCallbackComponent implements OnInit, OnDestroy {

  // routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
  //   let params: any = curr.parameters;
  //   if(params.code) {
  //
  //   }
  // }

  paramsSubscription: any;


  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params:any) => {
      console.log('Route Params', params);
      return this.handleAuthCode(params.code);
    });
  }

  handleAuthCode(code){
    this.slackService.authorise(code)
      .then((resp:any) => {
        if(resp.access_token) {
          // store in localStorage
          this.authService.setAccessToken(resp.access_token);
          this.router.navigate(['/quiz']);
        } else {
          console.log('Something went wrong receiving the access token.');
          this.router.navigate(['/login'])
        }
      })
      .catch((err) => console.log(err.json()));
  }


  constructor(
    private slackService:SlackService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router:Router
  ) {}
}
