import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {QuestionAvatarComponent} from "./question.avatar.cmp";
import {SolnetLoader} from "../solnet/solnet-loader.cmp";
import {QuestionNameComponent} from "./question.name.cmp";



@Component({
  selector: 'question-cmp',
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
  
    <solnet-loader *ngIf="! quiz"></solnet-loader>

    <div class="quiz-inner">
      <question-avatar-cmp [quiz]="quiz" (onOptionSelect)="selectOption($event)" *ngIf="quiz && quiz.type==='avatar'"></question-avatar-cmp>
      <question-name-cmp [quiz]="quiz" (onOptionSelect)="selectOption($event)" *ngIf="quiz && quiz.type==='name'"></question-name-cmp>
    </div>
    
  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton, QuestionAvatarComponent, QuestionNameComponent, SolnetLoader]
})
export class QuestionComponent {

  quiz: any;
  answer: any;

  static QUIZ_DELAY: number = 2000;

  constructor(private quizService: QuizService){
    this.nextQuiz();
  }

  nextQuiz(){

    this.quiz = undefined;
    this.answer = undefined;
    this.getQuiz()
      .then(quiz => this.quiz = quiz);

  }

  getQuiz(){
    return this.quizService.getQuiz()
      .toPromise();
  }


  selectOption(option) {

    if(! this.quiz.answered ){

      option.selected = true;
      this.quiz.answered = true;

      console.log('Quiz option selected', option);
      this.quizService.answerQuiz(this.quiz, option.id)
        .subscribe((result: any) => {
          console.log('Quiz option answer', result);

          option.correct = result.correct;

          if(! result.correct){
            let correctOption = this.quiz.options.find(option => {
              return option.id === result.answer.id;
            });
            correctOption.correct = true;
          }

          return Promise.all([
            this.getQuiz(),
            this.delay(QuestionComponent.QUIZ_DELAY)
          ])
            .then(([quiz]) => this.quiz = quiz);

        });
    }
  }


  delay(timeout = 0){
    return new Promise(success => setTimeout(success, timeout));
  }

}
