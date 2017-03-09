import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {MaterialServices} from '../../providers/material-services/material-services';
import {WorkServices} from '../../providers/work-services/work-services';
import {WarehouseServices} from '../../providers/warehouse-services/warehouse-services';

//import { ModalPage } from './modal-work-phase';


/*
  Generated class for the WorkPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/modals/ware-modal/ware-modal.html',
  providers:[WorkServices,WarehouseServices]
})
export class WareModal {
  
  public ware:any;
  public works:any;
  public id_ware:any;
  public materialAdded: any;

  constructor(public warehouseServices:WarehouseServices,public workServices: WorkServices, 
  private navCtrl: NavController, 
  public viewCtrl: ViewController,
  params: NavParams) {
    this.workServices.getWorks()
		.then(data => {
			this.works = Object(data);

		});
    this.ware = params.data;
    if(!this.ware.work){
      this.ware.work ={id:0};

    }
    this.id_ware = params.data.id; 
  }

  onChangeWare(wareName,wareSerie,id){
    var obj = {
      name: wareName.value,
      serie: wareSerie.value,
      work: id
    }
    this.warehouseServices.updateWares(this.id_ware,obj)
		.then(data => {
      this.ware = data;
		});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
