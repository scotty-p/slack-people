import {Component, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[primary]'
})
class Primary {
  constructor(el:ElementRef) {
    el.nativeElement.style.background = '#1e87d7';
    el.nativeElement.style.color = '#fff';
    el.nativeElement.style.opacity = '1';
  }
}

@Component({
  selector: 'solnet-button',
  styles: [`
    :host {
      cursor: pointer;
      padding: 12px 24px;
      
      text-align: center;
      border-radius: 40px;
      
      min-width: 128px;
      display: inline-block;
      
      background: #fff;
      opacity: 0.6;
      color: #3E5868;
      font-weight: 500;
      font-style: italic;
      font-family: 'adelle';
      
      margin: 12px;
      
      transition: all 200ms ease;

    }
    
    :host:hover {
      opacity: 0.8;    
    }
  `],
  template: `<ng-content></ng-content>`,
})
class SolnetBtn { }

export let SolnetButton = [SolnetBtn, Primary];
