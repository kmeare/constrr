import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WorkServices } from '../../providers/work-services/work-services';
import { PhaseServices } from '../../providers/phase-services/phase-services';
import { ModalController } from 'ionic-angular';
import { PhaseModal } from '../../modals/phase-modal/phase-modal';
import { EmployeeModal } from '../../modals/employee-modal/employee-modal';
import { WorkwareModal } from '../../modals/workware-modal/workware-modal';
import { BinnacleModal } from '../../modals/binnacle-modal/binnacle-modal';
import { RequisitionModal } from '../../modals/requisition-modal/requisition-modal';
import { Camera } from 'ionic-native';




/*
  Generated class for the WorkPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/work/work.html',
  providers: [WorkServices, PhaseServices],
})
export class WorkPage {
  public base64Image: string;
  public idWork: any;
  public workDetails: any;
  public phases: any;
  public spreads: any;
  public phase: any = {};
  public allPhases: any;
  public newPhases: any;

  constructor(public phaseServices: PhaseServices, public workServices: WorkServices,
  public modalCtrl: ModalController ,
  private navCtrl: NavController,
  params: NavParams) {
    this.idWork = params.get('idWork');
    this.workServices.getWorkById(this.idWork)
		.then(data => {
			this.workDetails = Object(data);
      this.phases = this.workDetails.phase;
      this.spreads = this.workDetails.spreads;
		});

    this.phaseServices.getPhases()
    .then(data => {
      this.allPhases = data;
      for (var i = 0; i < this.allPhases.length; i++) {
        for (var j = 0; j < this.phases.length; j++) {
          if (this.allPhases[i].id === this.phases[j].id ) {
            this.allPhases.splice(i, 1);
          }
        }
      }

    });
  }

  openPhaseModal(phase) {
    phase.id_work = this.idWork;
    let modal = this.modalCtrl.create(PhaseModal, phase);
    modal.present();
  }

  openEmployeeModal(work) {
    let modal = this.modalCtrl.create(EmployeeModal, work);
    modal.present();
  }

  openWorkwareModal(work) {
    let modal = this.modalCtrl.create(WorkwareModal, work);
    modal.present();
  }

  openBinnacleModal(work) {
    let modal = this.modalCtrl.create(BinnacleModal, work);
    modal.present();
  }

  openReqModal(work) {
    let modal = this.modalCtrl.create(RequisitionModal, work);
    modal.present();
  }
  
  onSelectPhase(idPhase) {
    this.phaseServices.addPhaseToWork(this.idWork, parseInt(idPhase))
    .then(data => {
      this.newPhases = data;
				this.phases = this.newPhases.phase;
       //  think is better call the constructor again but i don't know how to do that :D'
		});
  }

  

  takePhoto(work) {
    // Camera.getPicture({
    //     destinationType: Camera.DestinationType.DATA_URL, // Camera.DestinationType.FILE_URI
    //     targetWidth: 1000,
    //     targetHeight: 1000
    // }).then((imageData) => {
    //   // imageData is a base64 encoded string
    //    this.base64Image = "data:image/jpeg;base64," + imageData;
    //    var image = document.getElementById('lastPhoto');
    //    // image.src = imageData;
    // }, (err) => {
    //     console.log(err);
    // });
  }

  savePhoto () {
    
  }
  

  removePhase(e, phase) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.phaseServices.deletePhase(phase.id)
    .then(data => {
      // for(var i = 0; i < this.phases.length; i++){
      //   if(this.phases[i].id == data.id){
      //     this.phases.splice(i,1);
      //   }
      // }
		});
  }

}
