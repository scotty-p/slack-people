import {Component} from '@angular/core'
// import {MD_CARD_DIRECTIVES} from '@angular2-material/card'
// import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button'
import {SlackService} from "../services/slack.service";

@Component({
  selector: 'person-cmp',
  templateUrl: './people/templates/person.cmp.html',
  providers: [SlackService],
  // directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})
export class PersonComponent {

}
