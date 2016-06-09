import {Component} from '@angular/core';

@Component({
  selector: 'solnet-button',
  styles: [`
    .solnet-button-wrapper {
      cursor: pointer;
    }
    solnet-toolbar .solnet-button-wrapper {
      background: red;
    }
  `],
  template: `<span class="solnet-button-wrapper"><ng-content></ng-content></span>`,
})
export class SolnetButton { }
