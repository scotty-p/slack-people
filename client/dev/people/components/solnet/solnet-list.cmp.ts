import {Component, Directive, ElementRef} from '@angular/core';

@Component({
  selector: 'solnet-list',
  styles: [`

    .solnet-list-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    :host {
      width: 100%;
    }

  `],
  template: `<div class="solnet-list-wrapper"><ng-content></ng-content></div>`,
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
      width: 100%;
    }
    
    :host:hover {
      cursor: pointer;
    }

    .solnet-list-item-wrapper {
      display: flex;
      min-height: 64px;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
    }

  `],
  template: `<div class="solnet-list-item-wrapper"><ng-content></ng-content></div>`,
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
