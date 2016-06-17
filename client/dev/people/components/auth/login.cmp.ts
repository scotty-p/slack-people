import {Component} from "@angular/core";
import {LogoSvg} from "../svg/logo-svg.cmp";
import {SolnetContainer} from "../solnet/solnet-container.cmp";
import {GameSvg} from "../svg/game-svg.cmp";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SolnetButton} from "../solnet/solnet-button.cmp";

@Component({
  selector: 'support-cmp',
  template: `
    <header class="header">
      <solnet-container>
        <logo-svg class="logo"></logo-svg>
        <game-svg class="game"></game-svg>
        <h2>Find &amp; learn more about your team members</h2>
        <a href="">Learn more</a>
      </solnet-container>
    </header>
    <section class="section-login">
      <solnet-container class="section-login row">
        <span>Ready to go?</span>
        <a [href]="getOAuthUrl()"><solnet-button>Login with Slack</solnet-button></a>
      </solnet-container>
    </section>
    <section class="section-portfolio">
      <div class="container portfolio-container">
        <div class="block-txt">
          <h3>Have fun learning about people around you</h3>
          <p>Sure! We&apos;d love you to use our tool, it is fun, easy to use and available to everyone.</p>
        </div>
        <div class="block-img">
          <img src="./assets/images/whos-this.png" alt="Who is this">
        </div>
      </div>
    </section>
    <section class="section-help-center">
        <h1 class="help-title">Help center</h1>
        <div class="container help-container">
          <div class="panel">
            <h2>Want to add to Slack?</h2>
            <p>Sure! We&apos;d love you to use our tool, it is fun, easy to use and available to everyone.</p>
            <a [href]="getOAuthUrl()"><solnet-button primary>Add to Slack</solnet-button></a>
          </div>
          <div class="panel">
            <h2>Needs more information</h2>
            <p>Oh, you want to know some more about our nifty creation, sure flick an email!</p>
            <a href="mailto:slack@solnet.co.nz"><solnet-button primary>slack@solnet.co.nz</solnet-button></a>
          </div>
        </div>
    </section>
    <section class="section-portfolio">
      <div class="container portfolio-container">
        <div class="block-img">
          <img src="./assets/images/phone-list.png" alt="Phone list">
        </div>
        <div class="block-txt">
          <h3>Easily find who you need to, anywhere, anytime</h3>
          <p>Sure! We&apos;d love you to use our tool, it is fun, easy to use and available to everyone.</p>
        </div>
      </div>
    </section>
    `,
  styles: [`
    :host { width: 100%}
    :host p { line-height: 1.5em;}
    :host h1 { text-align: center; }
    :host h1, :host h2, :host h3 { font-family: 'adelle'; font-style: italic;}
    .header {     
       /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#0e589e+0,164e74+100 */
       background: #0e589e; /* Old browsers */
       background: -moz-linear-gradient(top,  #0e589e 0%, #164e74 100%); /* FF3.6-15 */
       background: -webkit-linear-gradient(top,  #0e589e 0%,#164e74 100%); /* Chrome10-25,Safari5.1-6 */
       background: linear-gradient(to bottom,  #0e589e 0%,#164e74 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
       filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0e589e', endColorstr='#164e74',GradientType=0 ); /* IE6-9 */
  
       min-height: 400px; color: #fff; padding: 40px 0; 
     }
    @media(min-width: 500px){.header { padding: 80px 0;}}
    .header a { color: white; text-decoration: none; border-bottom: 1px solid #49A5FF; }
    .header h2 { color: #fff; text-align:center; font-weight: 300; font-size: 1.4em; }
    .help-title {font-size: 1.8em;}
    .help-container { padding: 40px 0 60px; }
    .container { display: flex; justify-content: center; flex-direction: column; }
    .container.row { flex-direction: row;}
    .logo { max-width: 100%; width: 300px; margin: 0 auto 20px auto; }
    .game { width: 80px; height: 120px; }
    .panel { padding: 10px; }
    .portfolio-container { padding: 40px 0; }
    .section-login { height: 150px; background-color: #1e87d7; }
    .section-login span { color: #fff; }
    .section-portfolio { background-color: #384652; min-height: 500px; padding: 50px 10px; }
    .section-portfolio h3, .section-portfolio p { color: #fff; }
    .section-portfolio h3 { font-size: 2.5em }
    .section-portfolio img { width: 280px; max-width: 100%; }
    .section-portfolio .block-img { margin: 0 auto; flex-shrink: 0; }
    .section-portfolio .container { margin: 0 auto; flex-direction: column}
    .section-portfolio .container:nth-child(odd) { border-bottom: 1px solid #58656f}
    .row { flex-direction: row; justify-content: center;}
    .primary { background: #1e87d7; color: #fff; }
    .section-help-center { padding: 30px 0; }
    
    @media screen and (min-width: 680px) {
      .container { flex-direction: row; align-items: center;}
      .panel { width: 350px;}
      .panel:nth-child(odd) { padding-right: 50px; border-right: solid 1px #bbc4c9}
      .panel:nth-child(even) { padding-left: 50px}
      .section-portfolio .container { width: 800px; margin: 0 auto; flex-direction: row}
      .block-txt { padding: 20px }
    }
  `],
  directives: [LogoSvg, GameSvg, SolnetContainer, SolnetButton, ROUTER_DIRECTIVES]
})
export class LoginComponent {
  getOAuthUrl(){
    let redirectUrl = `${window.location.origin}/auth/callback`;
    return `https://slack.com/oauth/authorize?scope=client,identify&client_id=2194929392.48648557733&redirect_uri=${redirectUrl}`
  }
}
