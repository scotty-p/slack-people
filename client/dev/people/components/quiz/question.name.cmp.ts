import {Component, Input, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {SVG_DIRECTIVES} from "../svg/index";



@Component({
  selector: 'question-name-cmp',
  styles: [`
  
    .quiz-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .quiz-container.not-answered img {
      cursor: pointer;
    }
    .quiz-container.not-answered img:hover {
      opacity: 0.8;
    }
    
    img {
      border-radius: 50%;
      transition: all 200ms ease;
      width: 192px;
      height: 192px;
      position: absolute;
    }
    
    .quiz-container.is-answered .option:not(.option-selected) {
      opacity: 0.6;
    }
    .quiz-container.is-answered .option.option-selected {
      opacity: 1;
      border-color: #0E5895;
    }
    .quiz-container.is-answered .option.option-incorrect img,
    .quiz-container.is-answered .option.option-correct img{
      opacity: 0.5;
    }
    .quiz-container.is-answered .option.option-correct {
      opacity: 1;
      border-color: #83C441;
      background: #83C441;
    }
    .quiz-container.is-answered .option.option-incorrect {
      opacity: 1;
      border-color: #E04332;
      background: #E04332;
    }
    
    .image-container {
      border-radius: 50%;
      display: flex;
      align-items: center;
      position: relative;
      width: 192px;
      height: 192px;
      border: 5px solid transparent;
      margin: 12px;
    }
    
    tick-svg svg,
    cross-svg svg {
      height: 64px;
      width: 64px;
      opacity: 0.6;
    }
    
    tick-svg,
    cross-svg {
      align-items: center;
      left: 50%;
      position: relative;
      display: flex;
      margin-left: -32px;
      height: 64px;
      width: 64px;
    }
    
    
    h1, h2, h3 {
      text-align: center;
    }
    
    :host {
    
    }
    
  `],
  template: `
    
    <h3>Whos face matches this name?</h3>
    
    <h1>{{quiz.question.name}}</h1>

    <div class="quiz-container {{quiz.answered ? 'is-answered' : 'not-answered'}}">
      <div (click)="selectOption(option)" class="image-container option {{getOptionClass(option)}}" *ngFor="let option of quiz.options">
        <img src="{{option.image}}"/>
        <tick-svg [height]="64" [width]="64" *ngIf="option.correct === true"></tick-svg>
        <cross-svg [height]="64" [width]="64" *ngIf="option.correct === false"></cross-svg>
      </div>      
    </div>   

  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton, SVG_DIRECTIVES]
})
export class QuestionNameComponent {

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
