import {Component} from '@angular/core';
import {Platform, ionicBootstrap, Alert} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {Push} from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
// import {provideCloud, CloudSettings, Push,PushToken} from '@ionic/cloud-angular';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
 // sicosa137489
  private rootPage: any;
  public local: any;
  constructor(private platform: Platform) {

    this.local = new Storage(LocalStorage);
    if(this.local.get('user_id').__zone_symbol__value){
      this.rootPage = TabsPage;
    }else{

       this.rootPage = LoginPage;
    }

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // let pushio = Push.init({
      //   android: {
      //     senderID: "320041309230"
      //   },
      //   ios: {
      //     alert: "true",
      //     badge: true,
      //     sound: 'false'
      //   },
      //   windows: {}
      // });
      // console.log(Object.keys(pushio));
      // pushio.on('registration', (data) => {
      //   console.log(data.registrationId);
      //   alert(data.registrationId);
      // });
      // pushio.on('notification', (data) => {
      //   console.log(data);
      //   alert("Hi, Am a push notification");
      // });
      // pushio.on('error', (e) => {
      //   console.log(e.message);
      // });
      StatusBar.styleDefault();
    });
  }

   isLogged(){
       this.rootPage = TabsPage;
   }
}
ionicBootstrap(MyApp, [], {
    prodMode: true});
