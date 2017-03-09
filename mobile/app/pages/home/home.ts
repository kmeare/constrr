import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';
import {WorkServices} from '../../providers/work-services/work-services';
import {WorkPage} from '../../pages/work/work';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers:[WorkServices],
  selector: 'home'
})
export class HomePage {

  public local: any;
  public last_name: any;
  public first_name: any;
  public works: any;

  constructor(public workServices: WorkServices, private navCtrl: NavController) {
    this.navCtrl = navCtrl;
    this.local = new Storage(LocalStorage);
    this.first_name = this.local.get('first_name').__zone_symbol__value;
    this.last_name = this.local.get('last_name').__zone_symbol__value;
    //add role and if the role is admin or work encahrge show extra features of works
		this.workServices.getWorks()
		.then(data => {
			this.works = data;
		});

  }

  onClickWork(id){
    this.navCtrl.setRoot(WorkPage,{
      idWork: id
    });

  }
}
