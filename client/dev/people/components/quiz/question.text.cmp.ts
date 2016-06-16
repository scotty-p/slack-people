import {Component, Input, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {SVG_DIRECTIVES} from "../svg/index";
import {SolnetContainer} from "../solnet/solnet-container.cmp";



@Component({
  selector: 'question-text-cmp',
  styles: [`
    
    
    
    img.question-avatar{
      border-radius: 50%;
      width: 192px;
      height: 192px;
    }
    
    :host {
      width: 100%;
    }
    
    .dark-background {
      background: #3E5868;
      width: 100%;
      padding-bottom: 30px;
      margin-bottom: 10px;
    }
    
    .dark-background h2 {
      color: #fff;
    }
    
    solnet-container.option-container {
      max-width: 100%;
    }
    
    input:focus {
      outline: none;
    }
    input {
      border: none;
      border-bottom: 1px solid grey;
      font-size: 1.2em;
      flex-grow: 1;
    }
    
    form {
      display: flex;
      flex-direction: column;
    }
    
  `],
  template: `
    
    <div class="dark-background">
      <solnet-container>
        <h2>Who is this awesome person?</h2>
        <img class="question-avatar" src="{{quiz.question.image}}" />
      </solnet-container>
    </div>
    
    <solnet-container class="option-container">
      <form (ngSubmit)="selectOption()">
        <input [disabled]="quiz.textOption && quiz.textOption.disabled" [(ngModel)]="quiz.textValue" placeholder="Enter answer here ..."/>
        <solnet-button (click)="selectOption()" type="submit" >Submit</solnet-button>
      </form>
      
      <div *ngIf="quiz.textOption && quiz.textOption.correct">
        <h3>Correct! {{quiz.textOption.answer.name}}</h3>
      </div>
      
      <div *ngIf="quiz.textOption && quiz.textOption.correct === false">
        <h3>Not quite! {{quiz.textOption.answer.name}}</h3>
      </div>
      
    </solnet-container>
    
  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton, SVG_DIRECTIVES, SolnetContainer]
})
export class QuestionTextComponent {

  @Input()
  quiz: any;

  @Output()
  onOptionSelect: EventEmitter<any> = new EventEmitter();


  constructor(){}

  selectOption(){
    this.quiz.textOption = this.quiz.textOption || {};
    if(! this.quiz.textOption.disabled){
      console.log('Text answer is', this.quiz.text);
      this.quiz.textOption.disabled = true;
      this.quiz.textOption.id = this.quiz.textValue;
      this.onOptionSelect.emit(this.quiz.textOption);
    }
  }

  getOptionClass(option){
    return option.correct === undefined ?
      (option.selected ? 'option-selected' : '') :
      (option.correct ? 'option-correct' : 'option-incorrect');
  }

}
