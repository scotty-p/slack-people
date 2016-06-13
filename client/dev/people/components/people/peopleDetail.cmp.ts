import {Component, Input} from "@angular/core";
import {User} from "../../models/user";

@Component({
  selector: 'people-detail',
  template: `
    <div class="detail-panel">
      <img [src]="user.profile.image_192" class="user-profile" alt="profile pic">
      <span>{{user.name}}</span>
      <span>{{user.real_name}}</span>
      <span>{{user.profile.email}}</span>
      <span>{{user.profile.title}}</span>
    </div>
  `,
  styles: [`
    .detail-panel {
      padding: 20px;
      background-color: #ccc;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    .user-profile {
      border-radius: 50%;
      width: 192px;
      margin: 0 auto;
    }
  `]
})
export class PeopleDetailComponent {
  @Input() user:User;
}
