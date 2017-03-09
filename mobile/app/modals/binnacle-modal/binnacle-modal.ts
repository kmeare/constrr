import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BinnacleServices } from '../../providers/binnacle-services/binnacle-services';
import { Storage, LocalStorage } from 'ionic-angular';
import { Moment } from 'moment/moment';

//import { ModalPage } from './modal-work-phase';


/*
  Generated class for the WorkPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/modals/binnacle-modal/binnacle-modal.html',
  providers:[BinnacleServices]
})
export class BinnacleModal {
  
  public work:any;
  public idUser:any;
  local:any;
  
  constructor(
  private navCtrl: NavController, 
  public viewCtrl: ViewController,
  public binnacleServices: BinnacleServices,
  params: NavParams) {
    this.work = params.data;
    this.local = new Storage(LocalStorage);
    this.idUser = this.local.get('user_id').__zone_symbol__value;
    
    binnacleServices.getBinnacleById(this.work.id)
      .then(data=>{
        console.log(data);
      });
  }

  saveBinnacle(title,body){
    var obj = {
      title: title.value,
      body:body.value,
      work:this.work.id,
      user:this.idUser   
    }
    if(body.value == ''){
      alert('completa el campo de texto');
      return false;
    }
    this.binnacleServices.saveBinnacle(obj)
      .then(data=>{
        console.log(data);
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}

