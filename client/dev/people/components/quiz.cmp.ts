import {Component} from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list';
import {SlackService} from "../services/slack.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../services/quiz.service";


@Component({
  selector: 'quiz-cmp',
  styles: [`
    .quiz-container {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    img {
        
    }
  `],
  template: `
 
  <div *ngIf="quiz" class="quiz-container">
    <img src="{{quiz.question}}" />
    
    <md-list>
      <md-list-item (click)="selectOption(option)" *ngFor="let option of quiz.options">{{option.name}}</md-list-item>
    </md-list>    
    
  </div>
  
  `,
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_LIST_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES]
})
export class QuizComponent {

  quiz: any;

  constructor(private quizService: QuizService){

    quizService.getQuiz()
      .subscribe(quiz => {

        console.log('Quiz', quiz);
        this.quiz = quiz;
      });
  }

  selectOption(option){
    console.log('Quiz option selected', option);
  }

}
