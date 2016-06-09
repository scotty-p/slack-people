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
    }`
  ]
})
export class SolnetToolbar {
}
