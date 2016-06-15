import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import {SlackService} from "./slack.service";
import {AuthService} from "./auth.service";
import {Headers} from '@angular/http';


@Injectable()
export class QuizService {

  jsonHeaders: Headers;

  constructor(private http:Http, private authService:AuthService, private slackService:SlackService) {
    this.jsonHeaders = new Headers();
    this.jsonHeaders.append('Content-Type', 'application/json')
  }

  getQuiz(){
    return this.http.get(`/api/quiz/${this.authService.getAccessToken()}`)
      .map(response => response.json());
  }

  answerQuiz(quiz, answer){
    return this.http.post(`/api/quiz/${this.authService.getAccessToken()}`,
      JSON.stringify({quiz, answer}),
      {headers: this.jsonHeaders}
    ).map(response => response.json());
  }

  getLeaderBoard(){
    return this.http.get(`/api/leaderboard/${this.authService.getAccessToken()}`)
      .map(response => response.json())
      .combineLatest(this.slackService.getUsersAsStream(), (leaderboard, users) => {
        leaderboard.leaderboards = leaderboard.leaderboards.map(leader => {
          let user = users.find(user => leader.userId === user.id);
          return user ? Object.assign({}, user || {}, leader) : undefined;
        }).filter((leader) => !!leader);
        return leaderboard;
      });

  }

}
