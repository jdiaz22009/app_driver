import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '../../../providers/alerts'


@Component({
  selector: 'page-add-cart',
  templateUrl: 'add-cart.html',
})
export class AddCartPage {  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,    
    public loadingCtrl: LoadingController    
    ) {

      
    }

  

}
