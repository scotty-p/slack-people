import {Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'solnet-container',
  styles: [`
    .solnet-layout-wrapper {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      max-width: 500px;
      margin: 0 auto;
      padding: 20px 20px 0;
    }
  `],
  template: `<div class="solnet-layout-wrapper"><ng-content></ng-content></div>`,
})
export class SolnetContainer {

  constructor(){}

}
