import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";



@Component({
  selector: 'quiz-cmp',
  styles: [`
    .quiz-container {
      
      display: flex;
      flex-direction: column;
      align-items: center;

    }

    .quiz-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 40px 0;
    }

  `],
  template: `

  <div class="quiz-container">
    <md-progress-circle *ngIf="! quiz" mode="indeterminate"></md-progress-circle>

    <div *ngIf="quiz" class="quiz-inner">
      <img src="{{quiz.question}}" />

      <solnet-list>
        <solnet-list-item *ngFor="let option of quiz.options">
          <solnet-button (click)="selectOption(option)">{{option.name}}</solnet-button>
        </solnet-list-item>
      </solnet-list>

      <div *ngIf="answer" class="answer-container">
        <h3 *ngIf="answer.correct">Great!</h3>
        <h3 *ngIf="!answer.correct">Uh oh!</h3>
        <solnet-button (click)="nextQuiz()">Next</solnet-button>
      </div>

    </div>
  </div>

  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton]
})
export class QuestionComponent {

  quiz: any;
  answer: any;

  constructor(private quizService: QuizService){
    this.nextQuiz();
  }

  nextQuiz(){
    this.quiz = undefined;
    this.answer = undefined;

    this.quizService.getQuiz()
      .subscribe(quiz => {
        console.log('Quiz', quiz);
        this.quiz = quiz;
      });
  }

  selectOption(option){
    console.log('Quiz option selected', option);
    this.quizService.answerQuiz(this.quiz, option.id)
      .subscribe(correct => {
        this.answer = correct;
      });
  }

}
