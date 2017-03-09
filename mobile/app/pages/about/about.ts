import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WarehouseServices} from '../../providers/warehouse-services/warehouse-services';
import { ModalController } from 'ionic-angular';
import { WareModal } from '../../modals/ware-modal/ware-modal';
// import {SerialPipe} from '..⁄../pipes/serial-pipe/serial-pipe';

@Component({
  templateUrl: 'build/pages/about/about.html',
  providers: [WarehouseServices]
})
export class AboutPage {
  public wares: any;
  constructor(public modalCtrl: ModalController , public warehouseServices: WarehouseServices, private navCtrl: NavController) {
    this.navCtrl = navCtrl;
    this.warehouseServices.getWares()
		.then(data => {
			this.wares = data;
		});
  }
  onEdit(ware) {
     let modal = this.modalCtrl.create(WareModal, ware);
     modal.present();
  }
  onAddWare(name, serie, brand, model, description) {
    var obj = {
      name: name.value,
      no_serie: serie.value,
      brand: brand.value,
      model: model.value,
      description: description.value
    };
    this.warehouseServices.saveWare(obj)
		.then(data => {
			this.wares.push(data);
		});
  }

  onRemove(id) {
    this.warehouseServices.deleteWare(id)
    .then(data => {
      for (var i = 0; i < this.wares.length; i++) {
        if (this.wares[i].id === id) {
          this.wares.splice(i, 1);
        }
      }
    });
  }

  // getWares(e) {
  //   // Reset items back to all of the items
  
  //   // set val to the value of the ev target
  //   var val = e.target.value;
    
  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.wares = this.wares.filter((ware) => {
  //       return (ware.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }

}
