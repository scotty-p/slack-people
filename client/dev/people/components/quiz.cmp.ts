import {Component} from '@angular/core';
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

    .quiz-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 40px 0;
    }

    img {

    }
  `],
  template: `

  <div class="quiz-container">
    <md-progress-circle *ngIf="! quiz" mode="indeterminate"></md-progress-circle>

    <div *ngIf="quiz" class="quiz-inner">
      <img src="{{quiz.question}}" />

      <md-list>
        <md-list-item (click)="selectOption(option)" *ngFor="let option of quiz.options">{{option.name}}</md-list-item>
      </md-list>

      <div *ngIf="answer" class="answer-container">
        <h3 *ngIf="answer.correct">Great!</h3>
        <h3 *ngIf="!answer.correct">Uh oh!</h3>
        <md-button (click)="nextQuiz()">Next</md-button>
      </div>

    </div>
  </div>

  `,
  directives: []
})
export class QuizComponent {

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
