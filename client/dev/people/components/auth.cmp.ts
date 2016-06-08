import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';
import {AuthCallbackComponent} from "./authCallbackComponent";
import {MD_CARD_DIRECTIVES} from "@angular2-material/card/card";
import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button/button";

@Component({
  selector: 'auth-cmp',
  templateUrl: './people/templates/auth.cmp.html',
  styleUrls: ['./people/styles/auth.cmp.css'],
  directives: [ROUTER_DIRECTIVES, MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
})
@Routes([
  {path: '/callback/:code', component: AuthCallbackComponent}
])
export class AuthComponent { }
