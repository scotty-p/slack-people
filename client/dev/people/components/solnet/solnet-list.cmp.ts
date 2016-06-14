import {Component, Directive, ElementRef} from '@angular/core';

@Component({
  selector: 'solnet-list',
  styles: [`

    :host {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

  `],
  template: `<ng-content></ng-content>`,
  directives: []
})
class SolnetList {
  constructor(){ }
}


@Component({
  selector: 'solnet-list-item',
  styles: [`

    :host {
      display: flex;
      min-height: 64px;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
    }
    
    :host:hover {
      cursor: pointer;
    }


  `],
  template: `<ng-content></ng-content>`,
  directives: []
})
class SolnetListItem {
  constructor(){ }
}

@Component({
  selector: 'solnet-list-item-content',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      padding: 10px 0;
      width: 100%;
    }
    
  `]
})
class SolnetListItemContent {}

@Component({
  selector: 'solnet-list-item-detail',
  template: '<ng-content></ng-content>',
  styles: [`
  :host {
      width: 100%;
  }
  `]
})
class SolnetListItemDetail {}

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

@Directive({
  selector: '[solnet-list-item-border]'
})
class SolnetListItemBorder {
  constructor(el: ElementRef) {
    el.nativeElement.style.borderBottom = '1px solid #ddd';
  }
}


export let SOLNET_LIST_DIRECTIVES = [
  SolnetList,
  SolnetListItem,
  SolnetListItemContent,
  SolnetListItemDetail,
  SolnetListAvatar,
  SolnetListItemBorder
];
