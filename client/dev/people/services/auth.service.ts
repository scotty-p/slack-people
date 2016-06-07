import {Injectable} from '@angular/core'

@Injectable()
export class AuthService {
  constructor() {}

  isAuthorised():boolean {
    return this.getAccessToken() ? true : false;
  }

  setAccessToken(accessToken:string):void {
    localStorage.setItem('slack_accessToken', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('slack_accessToken');
  }

  logout(){
    return localStorage.setItem('slack_accessToken', undefined);
  }
}
