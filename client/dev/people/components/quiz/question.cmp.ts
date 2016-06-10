import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {QuestionAvatarComponent} from "./question.avatar.cmp";



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
  
    <md-progress-circle *ngIf="! quiz" mode="indeterminate"></md-progress-circle>

    <div class="quiz-inner">
      <question-avatar-cmp [quiz]="quiz" (onOptionSelect)="selectOption($event)" *ngIf="quiz && quiz.type==='avatar'"></question-avatar-cmp>
    </div>
    
  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton, QuestionAvatarComponent]
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

          setTimeout(() => {
            this.nextQuiz();
          }, 2000);

        });
    }




  }

}
