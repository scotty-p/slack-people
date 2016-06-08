import {Component} from '@angular/core'
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar'
import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button/button";
import {PeopleComponent} from "./people.cmp";

@Component({
  selector: 'main-layout',
  templateUrl: './people/templates/mainLayout.cmp.html',
  styleUrls: ['./people/styles/app.cmp.css'],
  directives: [PeopleComponent, MD_TOOLBAR_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})
export class MainLayoutComponent {}
