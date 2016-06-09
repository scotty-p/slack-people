import {Component} from '@angular/core';

@Component({
  selector: 'solnet-button',
  styles: [`
    .solnet-button-wrapper {
      cursor: pointer;
      padding: 12px 6px;
      
      text-align: center;
      border-radius: 25px;
      border: 2px solid #888;
      min-width: 128px;
      display: inline-block;
    }
  `],
  template: `<div class="solnet-button-wrapper"><ng-content></ng-content></div>`,
})
export class SolnetButton { }
