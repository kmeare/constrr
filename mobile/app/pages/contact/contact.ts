import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Storage, LocalStorage } from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import { RequisitionModal } from '../../modals/requisition-modal/requisition-modal';
import { ModalController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {
  public local: any;
  public last_name: any;
  public first_name: any;
  constructor(private navCtrl: NavController, public modalCtrl: ModalController ) {
    this.navCtrl = navCtrl;
    this.local = new Storage(LocalStorage);
    this.first_name = this.local.get('first_name').__zone_symbol__value;
    this.last_name = this.local.get('last_name').__zone_symbol__value;
  }

  openReqModal(work) {
    let modal = this.modalCtrl.create(RequisitionModal, work);
    modal.present();
  }

  onClickLogout() {
    this.navCtrl.setRoot(LoginPage);
    this.local.clear();
  }

}
