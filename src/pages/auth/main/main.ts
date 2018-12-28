import { Component } from '@angular/core'
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '../../../providers/alerts'
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,    
    public loadingCtrl: LoadingController,
    public menu: MenuController
    ) {

      
    }

  ionViewDidLoad() {
    this.menu.enable(false)
  }

  openPage(page){
    this.navCtrl.push(LoginPage, {mode: page})
  }

}
