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
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {ROUTER_DIRECTIVES, Routes, Router, OnActivate, RouteTree, RouteSegment} from '@angular/router';
import {SlackService} from "./slack.service";
import {AuthService} from "./auth.service";


@Injectable()
export class QuizService {

  constructor(private http:Http, private router:Router, private authService:AuthService, private slackService:SlackService) {}


  getQuiz(){
    return this.http.get(`/api/quiz/${this.authService.getAccessToken()}`)
      .map(response => response.json());
  }

  submitQuiz(){

  }

}
