import {Component, Input} from "@angular/core";
import {User} from "../../models/user";

@Component({
  selector: 'people-detail',
  template: `
    <div class="detail-modal">
      {{user.name}}
      {{user.real_name}}
    </div>
  `,
  styles: [`
    .detail-modal {
      height: 300px;
    }
  `]
})
export class PeopleDetailComponent {
  @Input() user:User;

  constructor() {
    console.log('PeopleDetailComponent', this.user);
  }
}
