import { provideRouter, RouterConfig } from '@angular/router';
import {MainLayoutComponent} from "./components/mainLayout.cmp";
import {LoginComponent} from "./components/auth/login.cmp";
import {AuthCallbackComponent} from "./components/auth/authCallbackComponent";
import {PeopleComponent} from "./components/people/people.cmp";
import {QuizComponent} from "./components/quiz/quiz.cmp";
import {QuizContainerComponent} from "./components/quiz/quiz.container.cmp";
import {QuestionComponent} from "./components/quiz/question.cmp";
import {LeaderboardComponent} from "./components/quiz/leaderboard.cmp";
import {AuthGuard} from "./auth-guard";


export const appRoutes: RouterConfig = [

  { path: 'auth/callback/:code', component: AuthCallbackComponent, terminal: true },
  { path: 'login',               component: LoginComponent},
  { path: '',                    component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'list',  component: PeopleComponent},
      { path: '',      component: QuizContainerComponent,
        children: [
          { path: 'quiz',         component: QuizComponent, terminal: true },
          { path: 'leaderboard',  component: LeaderboardComponent },
          { path: 'question',     component: QuestionComponent }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '/quiz', terminal: true }

];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
