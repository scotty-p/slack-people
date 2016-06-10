import {Component} from '@angular/core';

@Component({
  selector: 'solnet-toolbar',
  template: `
    <div class="toolbar">
      <div class="logo" alt="Solnet logo"></div>
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
      z-index: 10;
      width: 100%;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      background-image: url("https://solnet.co.nz/themes/solnet/images/logo-solnet.svg");
      background-size: 140px 30px;
      width: 140px;
      height: 30px;
    }`
  ]
})
export class SolnetToolbar {
}
