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

  socket: any;

  constructor(private http:Http, private authService:AuthService, private slackService:SlackService) {}

  getQuiz(){
    return this.http.get(`/api/quiz`,
        {headers: this.getHeaders()}
      ).map(response => response.json());
  }

  answerQuiz(quiz, answer){
    return this.http.post(`/api/quiz`,
      JSON.stringify({quiz, answer}),
      {headers: this.postHeaders()}
    ).map(response => response.json());
  }

  getLeaderBoard(){
    return this.http.get(`/api/leaderboard`,
        {headers: this.getHeaders()}
      ).map(response => response.json())
      .combineLatest(this.slackService.getUsersAsStream(), (leaderboard, users) => {
        leaderboard.leaderboards = leaderboard.leaderboards.map(leader => {
          let user = users.find(user => leader.userId === user.id);
          return user ? Object.assign({}, user || {}, leader) : undefined;
        }).filter((leader) => !!leader);
        return leaderboard;
      });
  }

  postHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', this.authService.getAccessToken());
    return headers;
  }

  getHeaders(){
    let headers = new Headers();
    headers.append('authorization', this.authService.getAccessToken());
    return headers;
  }

}
