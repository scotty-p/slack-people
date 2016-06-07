import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class SlackService {
  private url:string = 'https://slack.com/api/';
  private clientId:string = '2194929392.48648557733';
  private clientSecret:string = 'CLIENT_SECRET';

  constructor(private http:Http) {}

  authorise(code:string) {
    return this.http
      .get(this.url + 'oauth.access&client_id='+ this.clientId + 'client_secret='+ this.clientSecret +'&code='+code)
      .map(resp => resp.json())
      .toPromise();
  }

  findAllUsers() {
    return this.http
      .get(this.url + 'users.list')
      .map(resp => resp.json())
      .toPromise();
  }
}
