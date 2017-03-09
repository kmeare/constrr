import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


//import { ModalPage } from './modal-work-phase';


/*
  Generated class for the WorkPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/modals/employee-modal/employee-modal.html',
  providers:[]
})
export class EmployeeModal {
  
 
  constructor(
  private navCtrl: NavController, 
  public viewCtrl: ViewController,
  params: NavParams) {
    console.log(params.data);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }


}
