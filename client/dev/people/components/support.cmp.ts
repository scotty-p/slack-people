import {Component} from "@angular/core";
import {SolnetToolbar} from "./solnet/solnet-toolbar.cmp";
import {LogoSvg} from "./svg/logo-svg.cmp";
import {SolnetContainer} from "./solnet/solnet-container.cmp";

@Component({
  selector: 'support-cmp',
  template: `
    <solnet-toolbar>
      <logo-svg class="logo"></logo-svg>
    </solnet-toolbar>
    <solnet-container>
      <h1>Getting started for new users</h1>
      <p>Welcome aboard! 🚣 We've put together this guide to help you get started and make Slack work for you.</p>
    </solnet-container>
    `,
  styles: [`
    .logo {
      width: 160px;
      margin: 0 auto;
    }
  `],
  directives: [SolnetToolbar, LogoSvg, SolnetContainer]
})
export class SupportComponent {}
