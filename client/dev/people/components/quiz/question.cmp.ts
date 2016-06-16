import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {QuestionAvatarComponent} from "./question.avatar.cmp";
import {SolnetLoader} from "../solnet/solnet-loader.cmp";
import {QuestionNameComponent} from "./question.name.cmp";
import {SolnetContainer} from "../solnet/solnet-container.cmp";
import {Router} from '@angular/router'
import {QuestionTextComponent} from "./question.text.cmp";


@Component({
  selector: 'question-cmp',
  styles: [`


    .quiz-container {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      flex-direction: column;
      align-items: center;
      border-top: 1px solid #A0ADB4;
    }

    .quiz-inner {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      flex-direction: column;
      align-items: center;

    }

    .quiz-inner,
      question-avatar-cmp,
      question-name-cmp {
      width: 100%;
    }

    .current-score.is-active h4 {
      opacity: 1;
    }

    .current-score h4 {
      transition: opacity 200ms ease;
      opacity: 0;
      margin: 0;
      color: #fff;
    }
    .current-score {

      width: 100%;
      text-align: center;

      background: #3E5868;

      padding-top: 20px;
      height: 40px;
    }
    
    .current-score a {
      text-decoration: none;
    }
    .current-score a:focus {
      outline: none;
    }

  `],
  template: `


    <div class="quiz-container">

      <solnet-loader *ngIf="! quiz || ! quiz.type"></solnet-loader>

      <div class="quiz-inner">

        <div *ngIf="quiz" class="current-score {{quiz && quiz.currentScore && quiz.currentScore.currentScore > 0 ? 'is-active' : ''}}">
          <a [routerLink]="['/people/leaderboard']" tabindex="-1">
            <h4>{{quiz && quiz.currentScore && quiz.currentScore.currentScore || ''}}{{quiz && quiz.currentScore && quiz.currentScore.currentScore === 1 ? 'pt' : 'pts'}}</h4>
          </a>          
        </div>
        <question-text-cmp [quiz]="quiz" (onOptionSelect)="selectOption($event)" *ngIf="quiz && quiz.type==='text'"></question-text-cmp>
        <question-avatar-cmp [quiz]="quiz" (onOptionSelect)="selectOption($event)" *ngIf="quiz && quiz.type==='avatar'"></question-avatar-cmp>
        <question-name-cmp [quiz]="quiz" (onOptionSelect)="selectOption($event)" *ngIf="quiz && quiz.type==='name'"></question-name-cmp>
      </div>
    </div>


  `,
  directives: [SOLNET_LIST_DIRECTIVES, QuestionTextComponent, SolnetButton, ROUTER_DIRECTIVES, QuestionAvatarComponent, QuestionNameComponent, SolnetLoader, SolnetContainer]
})
export class QuestionComponent {

  quiz: any;
  answer: any;

  static QUIZ_DELAY: number = 2000;
  static QUIZ_DELAY_INCORRECT: number = 3000;

  constructor(private quizService: QuizService, private router: Router){
    this.getQuiz({}).then(quiz => this.quiz = quiz);
  }

  getQuiz(options){
    return this.quizService.getQuiz(options);
  }

  selectOption(option) {

    if( ! this.quiz.answered ){

      option.selected = true;
      this.quiz.answered = true;

      console.log('Quiz option selected', option);
      this.quizService.answerQuiz(this.quiz, option.id)
        .subscribe((result: any) => {
          console.log('Quiz option answer', result);

          option.correct = result.correct;
          option.answer = result.answer;

          this.quizService.updateCurrentScore(result.currentScore);

          if( ! result.correct ){
            let correctOption = this.quiz.options.find(option => {
              return option.id === result.answer.id;
            });
            correctOption.correct = true;

            return this.delay(QuestionComponent.QUIZ_DELAY_INCORRECT)
              .then(() => this.router.navigate(['/people/leaderboard']));

          }
          else {

            this.quiz.currentScore && this.quiz.currentScore.currentScore++;

            return Promise.all([
              this.getQuiz({force: true}),
              this.delay(QuestionComponent.QUIZ_DELAY)
            ]).then(([quiz]) => this.quiz = quiz);
          }
        });
    }
  }

  delay(timeout = 0){
    return new Promise(success => setTimeout(success, timeout));
  }

}
