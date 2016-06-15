import {Component} from "@angular/core";
import {LogoSvg} from "./svg/logo-svg.cmp";
import {SolnetContainer} from "./solnet/solnet-container.cmp";
import {GameSvg} from "./svg/game-svg.cmp";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SolnetButton} from "./solnet/solnet-button.cmp";

@Component({
  selector: 'support-cmp',
  template: `
    <header class="header">
      <solnet-container>
        <logo-svg class="logo"></logo-svg>
        <game-svg class="game"></game-svg>
        <h2>Find &amp; learn more about your team members</h2>
        <a href="#">Learn more</a>
      </solnet-container>
    </header>
    <section class="section-login">
      <solnet-container>
        <span>Ready to go?</span>
        <solnet-button >Login into Slack</solnet-button>
      </solnet-container>
    </section>
    <section>
        <h1>Help center</h1>
        <div class="container">
          <div class="panel">
            <h2>Want to add to Slack?</h2>
            <p>Sure! We&quot;d love you to use our tool, it is fun, easy to use and available to everyone.</p>
            <solnet-button>Add to Slack</solnet-button>
          </div>
          <div class="panel">
            <h2>Needs more information</h2>
            <p>Oh, you want to know some more about our nifty creation, sure flick an email!</p>
            <solnet-button>slack@solnet.co.nz</solnet-button>
          </div>
        </div>
    </section>
    <section class="section-portfolio">
      <div class="block">
        <figure>
          <img src="./assets/images/phone-list.png" alt="Phone list">
        </figure>
        <h3>Easily find who you need to, anywhere, anytime</h3>
        <p>Sure! We&quot;d love you to use our tool, it is fun, easy to use and available to everyone.</p>
      </div>
      <div class="block">
        <h3>Have fun learning about people around you</h3>
        <p>Sure! We&quot;d love you to use our tool, it is fun, easy to use and available to everyone.</p>
        <figure>
          <img src="./assets/images/whos-this.png" alt="Who is this">
        </figure>
      </div>
    </section>
    `,
  styles: [`
    :host { width: 100%}
    :host h1 { text-align: center}
    .header { background: #0e5895; min-height: 400px; color: #fff; padding-bottom: 20px; }
    .header a { color: white; text-decoration: none; border-bottom: 1px solid #49A5FF; }
    .header h2 { color: #fff; text-align:center }
    .container { display: flex; justify-content: center; flex-direction: column; }
    .logo { width: 200px; margin: 0 auto 20px auto; }
    .game { width: 80px; height: 120px; }
    .panel { padding: 10px; }
    .section-login { color: #fff !important; height: 150px; background-color: #1e87d7; }
    .section-portfolio { background-color: #384652; min-height: 500px;}
    .section-portfolio h3, .section-portfolio p { color: #fff; }
    
    @media screen and (min-width: 680px) {
      .container { flex-direction: row;}
      .panel { width: 350px;}
    }
  `],
  directives: [LogoSvg, GameSvg, SolnetContainer, SolnetButton, ROUTER_DIRECTIVES]
})
export class SupportComponent {}
