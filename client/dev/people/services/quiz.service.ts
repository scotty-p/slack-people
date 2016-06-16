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
import {Observable} from "rxjs/Observable";


@Injectable()
export class QuizService {

  leaderboardObservable;
  leaderboardObserver;
  leaderboardStore;

  quizPromiseCache;

  constructor(private http:Http, private authService:AuthService, private slackService:SlackService) { }


  getQuiz(options){

    options = options || {};

    return this.quizPromiseCache && ! options.force ? this.quizPromiseCache :
      this.quizPromiseCache = this.http.get(`/api/quiz`,
      {headers: this.getHeaders()}
    ).map(response => response.json())
      .toPromise();
  }

  answerQuiz(quiz, answer){

    return this.http.post(`/api/quiz`,
      JSON.stringify({quiz, answer}),
      {headers: this.postHeaders()}
    ).map(response => response.json());
  }

  getLeaderBoardStream(){

    if( ! this.leaderboardObservable ){
      this.leaderboardObservable = new Observable(observer => this.leaderboardObserver = observer).share();
      this.leaderboardObservable.subscribe(leaderboard => this.updateLeaderboardStore(leaderboard));

      // TODO turn this into a socket
      setInterval(() => { this.updateLeaderboard().subscribe(leaderboard => this.leaderboardObserver.next(leaderboard)); }, 20000);
    }

    this.updateLeaderboard().subscribe(leaderboard => this.leaderboardObserver.next(leaderboard));

    if(this.leaderboardStore) {
      setTimeout(() => this.leaderboardObserver.next(this.leaderboardStore), 0);
    }

    return this.leaderboardObservable;
  }

  updateLeaderboard() {
    return this.http.get(`/api/leaderboard`,
      {headers: this.getHeaders()}
    ).map(response => response.json())
      .combineLatest(this.slackService.getUsersAsStream(), (leaderboard, users) => {

        leaderboard.leaderboards = leaderboard.leaderboards.map(leader => {
          let user = users.find(user => leader.userId === user.id);
          return user ? Object.assign({score: 0}, user || {}, leader) : undefined;
        }).filter((leader) => !!leader);

        console.log('leaderboards before sort', leaderboard.leaderboards);
        leaderboard.leaderboards.sort((a, b) => b.score >= a.score);
        console.log('leaderboards after sort', leaderboard.leaderboards);

        return leaderboard;
      });
  }

  updateLeaderboardStore(leaderboard){
    this.leaderboardStore = leaderboard;
  }

  updateCurrentScore(currentScore){
    if(this.leaderboardStore && currentScore){
      this.leaderboardStore.currentScore = currentScore;
    }
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
