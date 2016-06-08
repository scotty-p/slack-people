import {Injectable} from '@angular/core'

@Injectable()
export class AuthService {
  private SLACK_ACCESS_TOKEN:string = 'SLACK_ACCESS_TOKEN'

  constructor() {}

  isAuthorised():boolean {
    return this.getAccessToken() ? true : false;
  }

  setAccessToken(accessToken:string):void {
    localStorage.setItem(this.SLACK_ACCESS_TOKEN, accessToken);
  }

  getAccessToken() {
    return localStorage.getItem(this.SLACK_ACCESS_TOKEN);
  }

  logout(){
    return localStorage.removeItem(this.SLACK_ACCESS_TOKEN);
  }
}
