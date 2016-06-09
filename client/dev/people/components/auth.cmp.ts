import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';
import {AuthCallbackComponent} from "./authCallbackComponent";


@Component({
  selector: 'auth-cmp',
  template: `
  <div class="auth-container">
    <div class="auth-content logo">
      <p>Sign in first to start using this app.</p>
      <p>
        <a href="{{getOAuthUrl()}}">
          <img src="https://api.slack.com/img/sign_in_with_slack.png" />
        </a>
      </p>
      <router-outlet></router-outlet>
    </div>
  </div>
`,
  styleUrls: ['./people/styles/auth.cmp.css'],
  directives: [ROUTER_DIRECTIVES],
})
@Routes([
  {path: '/callback/:code', component: AuthCallbackComponent}
])
export class AuthComponent {

  getOAuthUrl(){
    let redirectUrl = `${window.location.origin}/auth/callback`;

    return `https://slack.com/oauth/authorize?scope=client&client_id=2194929392.48648557733&redirect_uri=${redirectUrl}`
  }

}
