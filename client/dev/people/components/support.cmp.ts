import {Component} from "@angular/core";
import {SolnetToolbar} from "./solnet/solnet-toolbar.cmp";
import {LogoSvg} from "./svg/logo-svg.cmp";
import {GameSvg} from "./svg/game-svg.cmp";
import {ListSvg} from "./svg/list-svg.cmp";
import {SolnetContainer} from "./solnet/solnet-container.cmp";

@Component({
  selector: 'support-cmp',
  template: `
    <solnet-toolbar>
      <game-svg class="link" [routerLink]="['/people/quiz']"></game-svg>
      <logo-svg class="logo"></logo-svg>
      <list-svg class="link" [routerLink]="['/people/list']"></list-svg>
    </solnet-toolbar>
    <solnet-container>
      <h1>Getting started for new users</h1>
      <p>Welcome aboard! 🚣 We've put together this guide to help you get started and make Slack work for you.</p>
    </solnet-container>
    `,
  styles: [`
    .logo {
      width: 160px;
    }
    
    .link {
      cursor: pointer;
      height: 30px;
      width: 30px;
      display: inline-block;
    }
  `],
  directives: [SolnetToolbar, LogoSvg, GameSvg, ListSvg, SolnetContainer]
})
export class SupportComponent {}
