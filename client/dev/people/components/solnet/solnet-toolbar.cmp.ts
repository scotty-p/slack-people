import {Component} from '@angular/core';

@Component({
  selector: 'solnet-toolbar',
  template: `
    <div class="toolbar">
      <div class="logo" alt="Solnet logo"></div>
      <div class="fill-toolbar-gap"></div>
      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `.toolbar {
      background: rgba(14, 88, 158, 1);
      color: #fff;
      position: fixed;
      top: 0;
      z-index: 100;
      width: 100%;
      display: flex;
      height: 64px;
      align-items: center;
    }
    .toolbar a {
      margin: 0 6px;
      text-decoration: initial;
    }
    .logo {
      background-image: url("https://solnet.co.nz/themes/solnet/images/logo-solnet.svg");
      background-size: 140px 30px;
      width: 140px;
      height: 30px;
    }
    .fill-toolbar-gap {
      flex: 1 1 auto;
    }`
  ]
})
export class SolnetToolbar {
}
