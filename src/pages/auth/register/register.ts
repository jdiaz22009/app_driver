import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '../../../providers/alerts'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,    
    public loadingCtrl: LoadingController    
    ) {

      
    }  
  

}
