import {Component} from '@angular/core';


@Component({
  selector: 'auth-cmp',
  template: `
  <div class="auth-container">
    <div class="auth-content logo">
    
      <p>Sign in first to start using this app.</p>
      
      <div>
      <a class="slack-o-auth-button" href="{{getOAuthUrl()}}">
          <!-- <img src="https://api.slack.com/img/sign_in_with_slack.png" /> -->
          <img src="data:image/png;base64,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" />
        </a>
      </div>
    </div>
  </div>
`,
  styles: [`
  .auth-container {
    
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#0e589e+0,164e74+100 */
    background: #0e589e; /* Old browsers */
    background: -moz-linear-gradient(top,  #0e589e 0%, #164e74 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #0e589e 0%,#164e74 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #0e589e 0%,#164e74 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0e589e', endColorstr='#164e74',GradientType=0 ); /* IE6-9 */

    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  
  .auth-content {
    position: relative;
    padding-top: 60px;
    text-align: center;
    color: #fff;
  }
  
  .logo {
    background-image: url("https://solnet.co.nz/themes/solnet/images/logo-solnet.svg");
    background-repeat: no-repeat;
    background-size: 140px 30px;
    background-position-x: center;
  }
  
  .slack-o-auth-button {
    display: block;
    height: 50px;
  }
  
`],
  directives: [],
})
export class AuthComponent {

  getOAuthUrl(){
    let redirectUrl = `${window.location.origin}/auth/callback`;

    return `https://slack.com/oauth/authorize?scope=client&client_id=2194929392.48648557733&redirect_uri=${redirectUrl}`
  }

}
