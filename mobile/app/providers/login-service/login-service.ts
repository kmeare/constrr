import { Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginSerivce provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginSerivce {
	
	private headers: Headers;
	data: any = null;
	username: any
	
	constructor(private http: Http) { }

	load(user,pass) {
		if (this.data) {
			// already loaded data
			return Promise.resolve(this.data);
		}

		// don't have the data yet
		return new Promise(resolve => {
			// We're using Angular HTTP provider to request the data,
			// then on the response, it'll map the JSON data to a parsed JS object.
			// Next, we process the data and resolve the promise with the new data.
			this.http.post('http://intranet.sicosa.mx:8088/login',{email: user, password:pass })
			.map(res => res.json())
			.subscribe(res => {
				this.data = res;
				resolve(this.data);
			});
		});
	}

	assignDeviceTokenToUser(user_id,device_token){
		// if (this.data) {
		// // already loaded data
		// 	return Promise.resolve(this.data);
   		// }
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify({device_token:device_token});
   		// don't have the data yet
   		return new Promise(resolve => {

			return this.http.put('http://intranet.sicosa.mx:8088/user/'+user_id,body,{ headers: this.headers })
			.map(res => res.json()).subscribe(res => {
				this.data = res;
				resolve(this.data);
      		});
   		});
	}

}
