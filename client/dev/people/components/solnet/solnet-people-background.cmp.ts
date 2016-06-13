import {Component} from '@angular/core';
import {SlackService} from "../../services/slack.service";

@Component({
  selector: 'solnet-people-background',
  styles: [`
    
    .users-container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      
      background-color: #3E5868;
      
      position: absolute;
      top: 0;
      z-index: 0;
      height: 100%;
      overflow: hidden;
    }   
    
    .users-container img {
      opacity: 0.08;
      flex-grow: 1;
    }
    
    .padding {
      width: 100%;
      height: 70px;
    }
    
    
  `],
  template: `

    <div class="users-container" *ngIf="users">
      <div class="padding"></div>
      <img *ngFor="let user of users" src="{{user.profile.image_192}}"/>
    </div>
    
  `,
  providers: [SlackService],
  directives: []
})
export class SolnetPeopleBackgroundComponent {

  users: any[];

  constructor(private slackService:SlackService) {
    slackService.getUsersAsStream()
      .subscribe(users => this.users = users);
  }

}
