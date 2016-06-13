import {Component, Input} from "@angular/core";
import {User} from "../../models/user";

@Component({
  selector: 'people-detail',
  template: `
    <div class="detail-panel">
      <img [src]="user.profile.image_192" class="user-profile" alt="profile pic">
      <p>{{user.name}}</p>
      <p>{{user.real_name}}</p>
    </div>
  `,
  styles: [`
    .detail-panel {
      padding: 20px;
      background-color: #ccc;
      display: flex;
      flex-direction: column;
    }
    .user-profile {
      border-radius: 50%;
      width: 192px;
    }
  `]
})
export class PeopleDetailComponent {
  @Input() user:User;

  constructor() {
    console.log('PeopleDetailComponent', this.user);
  }
}
