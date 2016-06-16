import {Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'solnet-container',
  styles: [`
    :host {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      position: relative;
      flex-direction: column;
      align-items: center;
      max-width: 560px;
      margin: 0 auto;
      padding: 20px;
    }
  `],
  template: `<ng-content></ng-content>`,
})
export class SolnetContainer {

  constructor(){}

}
