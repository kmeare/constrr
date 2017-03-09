import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RequisitionServices } from '../../providers/requisition-services/requisition-services';
import { Storage, LocalStorage } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { ModalPage } from './modal-work-phase';


/*
  Generated class for the WorkPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/modals/requisition-modal/requisition-modal.html',
  providers: [RequisitionServices]
})
export class RequisitionModal {
  
  public local: any;
  public workId: any; 
  public reqs: any;
  public role: any;
  constructor(
  private navCtrl: NavController, 
  public viewCtrl: ViewController,
  public requisitionServices: RequisitionServices,
  public alertCtrl: AlertController,
  params: NavParams) {
    this.local = new Storage(LocalStorage);
    this.workId = params.data.id;
    this.role = this.local.get('area').__zone_symbol__value;
    this.requisitionServices.getReqsByWork(this.workId).then(data => {
      this.reqs = data;
    });
  }

  sendReq(product, unit, qty_required, departure, description) {
    var obj = {
      product: product.value,
      unit: unit.value,
      qty_required: qty_required.value,
      departure: departure.value,
      description: description.value,
      user: this.local.get('user_id').__zone_symbol__value,
      work: this.workId,
      status: 'Pendiente'
    };
    if (product.value === '' || qty_required === '') {
      alert('por favor, llena todos los campos ');
      return false;
    }
    this.requisitionServices.saveRequisition(obj).then(data => {
      let alert = this.alertCtrl.create({
        title: product.value,
        subTitle: 'Agregado Satisfactoriamente',
        buttons: ['OK']
      });
      alert.present();
    });
    
  }

  preapproveReq (req) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}