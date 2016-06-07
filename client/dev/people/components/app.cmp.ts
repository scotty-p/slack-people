import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router, OnActivate, RouteTree, RouteSegment} from '@angular/router';
import {AuthComponent} from "./auth.cmp";
import {PersonComponent} from "./person.cmp";

@Component({
  selector: 'app-cmp',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  { path: '/auth',          component: AuthComponent},
  { path: '/person',        component: PersonComponent}
])
export class AppComponent implements OnActivate {
  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    console.log(prevTree)
  }

  constructor(private router:Router) {}
}
