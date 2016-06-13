import {Component, Input, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {SVG_DIRECTIVES} from "../svg/index";
import {SolnetContainer} from "../solnet/solnet-container.cmp";



@Component({
  selector: 'question-avatar-cmp',
  styles: [`
    
    .option-status {
      transition: all 200ms ease;
      background-color: #fff;
      border: 1px solid #aaa;
      
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .option-status.option-selected {
      background-color: #0E5895;
      border-color: #0E5895;
    }
    .option-status.option-correct {
      background-color: #83C441;
      border-color: #83C441;
    }
    .option-status.option-incorrect {
      background-color: #E04332;
      border-color: #E04332;
    }
    
    .avatar-container .option-status {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      margin-right: 12px;
    }

    .list-item {
      min-height: 70px;
      padding: 0 20px;
      border-radius: 40px;
      transition: background-color 200ms ease;
    }
    
    
    img.question-avatar{
      border-radius: 50%;
      width: 192px;
      height: 192px;
    }
    
    solnet-list {
      width: 300px;
      margin-top: 12px;
    }
    
    solnet-list.not-answered solnet-list-item {
      cursor: pointer;
    }
    solnet-list.is-answered solnet-list-item {
      cursor: default;
    }
    solnet-list.not-answered solnet-list-item:hover {
      background-color: #eee;
    }
    
    h1, h2 {
      text-align: center;
    }
    
    tick-svg,
    cross-svg {
      position: relative;
      top: 2px;
    }
    
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    
    h2 {
      font-family: 'adelle';
      font-weight: 500;
      font-style: italic;
    }
    
    .dark-background {
      background: #3E5868;
      width: 100%;
      padding-bottom: 50px;
    }
    
    .dark-background h2 {
      color: #fff;
    }
    
    
  `],
  template: `
    
    <div class="dark-background">
      <solnet-container>
        <h2>Who is this awesome person?</h2>
        <img class="question-avatar" src="{{quiz.question.image}}" />
      </solnet-container>
    </div>
    
    <solnet-container>
      <solnet-list class="{{quiz.answered ? 'is-answered' : 'not-answered'}}">
        <solnet-list-item class="list-item" (click)="selectOption(option)" *ngFor="let option of quiz.options">
          
          <div class="avatar-container">
            <div class="option-status {{getOptionClass(option)}}">
              <tick-svg *ngIf="option.correct === true"></tick-svg>
              <cross-svg *ngIf="option.correct === false"></cross-svg>
            </div>
          </div>
    
          <div class="user-content-container">
            <h3>{{option.name}}</h3>
          </div>
        </solnet-list-item>
      </solnet-list>
    </solnet-container>

  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton, SVG_DIRECTIVES, SolnetContainer]
})
export class QuestionAvatarComponent {

  @Input()
  quiz: any;

  @Output()
  onOptionSelect: EventEmitter<string> = new EventEmitter();

  constructor(){}

  selectOption(option){
    this.onOptionSelect.emit(option);
  }

  getOptionClass(option){
    return option.correct === undefined ?
      (option.selected ? 'option-selected' : '') :
      (option.correct ? 'option-correct' : 'option-incorrect');
  }

}
