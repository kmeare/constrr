import { Component , bind} from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginSerivce} from '../../providers/login-service/login-service';
import {MyApp} from '../../app';
import {TabsPage} from '../../pages/tabs/tabs';
import {Md5} from 'ts-md5/dist/md5';
import { Storage, LocalStorage } from 'ionic-angular';
import {Push} from 'ionic-native';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	templateUrl: 'build/pages/login/login.html',
	providers: [LoginSerivce],
	selector: 'login'

})
export class LoginPage {

	public login: any;
	public local: any;
	public user_id: any;
	constructor(public loginSerivce: LoginSerivce,  public nav: NavController) {
		this.nav = nav;
	}

	onLogin(username, password) {

		this.loginSerivce.load(username, password)
		.then(data => {
			this.login = data;
			this.nav.setRoot(TabsPage);
			this.user_id = data.user.id;
			this.local = new Storage(LocalStorage);
			this.local.set('user_id', Object(data.user.id));
			this.local.set('last_name', Object(data.user.last_name));
			this.local.set('first_name', Object(data.user.first_name));
			this.local.set('area', Object(data.user.area));
			this.loadLoginData(this.user_id);

		});
		// this.myApp.isLogged();
			}

	loadLoginData(user_id) {
		console.log(user_id);
		let pushio = Push.init({
				android: {
					senderID: '320041309230',
					sound: 'true',

				},
				ios: {
					alert: 'true',
					badge: true,
					sound: 'true'
				},
				windows: {}
			});

			pushio.on('registration', (data) => {
				// console.log(data.registrationId);
				// alert(data.registrationId);
				this.loginSerivce.assignDeviceTokenToUser(user_id, data.registrationId)
				.then(data => {

				});
			});
			// pushio.on('notification', (data) => {
			// 	console.log(data);
			// 	alert("Hi, Am a push notification");
			// });
			pushio.on('error', (e) => {
				console.log(e.message);
			});
	}

}
