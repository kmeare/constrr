import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import { Storage, LocalStorage } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  public local: any;
  public role:any;
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.local = new Storage(LocalStorage);
    this.role = this.local.get('area').__zone_symbol__value;
    
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
  }
}
