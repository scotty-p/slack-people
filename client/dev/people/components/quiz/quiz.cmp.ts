import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {ROUTER_DIRECTIVES} from '@angular/router';



@Component({
  selector: 'quiz-cmp',
  styles: [`
  
  `],
  template: `

    
    <h3>Learn about the awesome people in your team and see who know the most on the leaderboard!</h3>
    
    <solnet-button [routerLink]="['/people/question']">Play Now</solnet-button>
    <solnet-button [routerLink]="['/people/leaderboard']">View Leaderboard</solnet-button>
    

  `,
  directives: [SOLNET_LIST_DIRECTIVES, SolnetButton, ROUTER_DIRECTIVES]
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
