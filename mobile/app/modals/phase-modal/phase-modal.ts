import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {MaterialServices} from '../../providers/material-services/material-services';

//import { ModalPage } from './modal-work-phase';


/*
  Generated class for the WorkPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/modals/phase-modal/phase-modal.html',
  providers:[MaterialServices]
})
export class PhaseModal {
  
  public phase:any;
  public materials:any;
  public materialAdded: any;

  constructor(public materialServices: MaterialServices, 
  private navCtrl: NavController, 
  public viewCtrl: ViewController,
  params: NavParams) {
    this.phase = params.data;
    this.materialServices.getMaterialsByPhaseWork(this.phase.id_work, this.phase.id)
		.then(data => {
			this.materials = Object(data);
      console.log(this.materials);
		});
  }

  onAddMaterial(name,price,qty){
    var obj ={
      name: name.value,
      price: price.value,
      qty: qty.value,
      work: this.phase.id_work,
      phase: this.phase.id
    }
    this.materialServices.savePhaseMaterials(obj)
    .then(data=>{
      this.materialAdded = data;
      this.materials.push(data);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
