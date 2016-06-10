import {Component, Directive, ElementRef} from '@angular/core';

@Component({
  selector: 'solnet-list',
  styles: [`
  
    .solnet-list-wrapper {
      display: flex;
      flex-direction: column;
    }
    
  `],
  template: `

  <div class="solnet-list-wrapper"><ng-content></ng-content></div>

  `,
  directives: []
})
class SolnetList {
  constructor(){ }
}


@Component({
  selector: 'solnet-list-item',
  styles: [`
  
    .solnet-list-item-wrapper {
      display: flex;
      min-height: 80px;
      align-items: center;       
    }
        
  `],
  template: `

  <div class="solnet-list-item-wrapper"><ng-content></ng-content></div>

  `,
  directives: []
})
class SolnetListItem {
  constructor(){ }
}


@Directive({
  selector: '[solnet-list-avatar]'
})
class SolnetListAvatar {
  constructor(el: ElementRef) {
    el.nativeElement.style.height = '64px';
    el.nativeElement.style.width = '64px';
    el.nativeElement.style.marginRight = '12px';
    el.nativeElement.style.borderRadius = '50%';
  }
}


export let SOLNET_LIST_DIRECTIVES = [SolnetList, SolnetListItem, SolnetListAvatar];
