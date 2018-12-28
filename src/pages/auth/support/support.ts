import { Component } from '@angular/core'
import { NavController, NavParams, MenuController } from 'ionic-angular'

import { AlertsProvider } from '../../../providers/alerts'


@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,    
    public menu: MenuController
    ) {

      
    }
  ionViewDidLoad() {
  
  }

  whatsapp(){

  }

  call(){
    
  }

  
}
