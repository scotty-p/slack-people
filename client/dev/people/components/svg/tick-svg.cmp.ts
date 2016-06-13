import {Component, Input} from '@angular/core';

@Component({
  selector: 'tick-svg',
  template: `<svg fill="#fff" [attr.height]="height || 24" viewBox="0 0 24 24" [attr.width]="width || 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
</svg>`,
})
export class TickSvg {

  @Input()
  height: string;
  @Input()
  width: string;

  constructor(){}

}
