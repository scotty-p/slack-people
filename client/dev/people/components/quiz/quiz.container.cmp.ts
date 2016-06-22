import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import {QuizService} from "../../services/quiz.service";
import {SOLNET_LIST_DIRECTIVES} from "../solnet/solnet-list.cmp";
import {SolnetButton} from "../solnet/solnet-button.cmp";
import {ROUTER_DIRECTIVES} from '@angular/router';
import {SolnetContainer} from "../solnet/solnet-container.cmp";
import {SolnetPeopleBackgroundComponent} from "../solnet/solnet-people-background.cmp";



@Component({
  selector: 'quiz-container-cmp',
  styles: [`
  `],
  template: `

    <router-outlet></router-outlet>

  `,
  directives: [ROUTER_DIRECTIVES]
})
export class QuizContainerComponent {

  constructor(private quizService: QuizService){}

}


