import {Component, Input, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";



@Component({
  selector: 'question-avatar-cmp',
  styles: [`
    
    .option-status {
      border: 1px solid #aaa;
    }
    
    .option-status.option-selected {
      background-color: blue;
    }
    .option-status.option-correct {
      background-color: green;
    }
    .option-status.option-incorrect {
      background-color: red;
    }

    .avatar-container .option-status {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      margin-right: 12px;
    }

    .list-item {
      min-height: 70px;
    }
    
    img.question-avatar{
      border-radius: 50%;
    }
    
  `],
  template: `
    
    <img class="question-avatar" src="{{quiz.question}}" />

    <solnet-list>
      <solnet-list-item class="list-item" (click)="selectOption(option)" *ngFor="let option of quiz.options">
        
        <div class="avatar-container">
          <div class="option-status {{getOptionClass(option)}}"></div>
        </div>    
  
        <div class="user-content-container">
          <h3>{{option.name}}</h3>
        </div>
      </solnet-list-item>
    </solnet-list>

  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton]
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
