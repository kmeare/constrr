import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WarehouseServices } from '../../providers/warehouse-services/warehouse-services';
import { ModalController } from 'ionic-angular';
import { WareModal } from '../../modals/ware-modal/ware-modal';

//import { ModalPage } from './modal-work-phase';


/*
  Generated class for the WorkPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/modals/workware-modal/workware-modal.html',
  providers:[WarehouseServices]
})
export class WorkwareModal {
  
  public work:any;
  public wares:any;   
  constructor(
  private navCtrl: NavController, 
  public viewCtrl: ViewController,
  params: NavParams,
  public warehouseServices: WarehouseServices,
  public modalCtrl:ModalController) {
    this.work = params.data;
    warehouseServices.getWaresById(this.work.id).then(data => {
			this.wares = data;
		});
  }

  onAddWare(name,serie,brand,model,description,idWork){
    if(name.value == ''){
      alert('Completa el campo Nombre');
      return false;
    }
    var obj = {
      name: name.value,
      no_serie: serie.value,
      brand:brand.value,
      model:model.value,
      description: description.value,
      work:idWork
    }
    this.warehouseServices.saveWare(obj)
		.then(data => {
			this.wares.push(data);
		});
  }

  onEdit(ware){
     let modal = this.modalCtrl.create(WareModal,ware);
     modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
