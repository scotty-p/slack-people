import {Component, OnDestroy} from '@angular/core';
import {SlackService} from "../../services/slack.service";

let windowBinding;

@Component({
  selector: 'solnet-people-background',
  styles: [`


    .users-container {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
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
      opacity: 0.05;
      flex-grow: 1;      
    }

    .padding {
      width: 100%;
      height: 70px;
    }


  `],
  template: `

    <div class="users-container">
      <div class="padding"></div>
      <img [style.width]="width" [style.height]="height" *ngFor="let user of users" *ngIf="user && user.profile && user.profile.image_192" src="{{user.profile.image_192}}"/>
    </div>

  `,
  providers: [SlackService],
  directives: []
})
export class SolnetPeopleBackgroundComponent implements OnDestroy {

  users: any[];
  window: any;

  width: string = '128px';
  height: string = '128px';

  constructor(private slackService:SlackService) {
    slackService.getUsersAsStream()
      .subscribe(users => {
        this.users = users;
      });

    this.window = window;
    windowBinding = this.onWindowResize.bind(this);
    this.window.addEventListener('resize', windowBinding)

  }

  onWindowResize($event){
    let width = this.getWindowWidth();
    let tiles = Math.floor(width / 128);
    let tileWidth = width / tiles;
    this.width = this.height = `${tileWidth}px`;
  }

  getWindowWidth(){
    return window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }

  ngOnDestroy():any{
    this.window.removeEventListener('resize', windowBinding);
  }

}
