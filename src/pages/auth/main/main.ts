import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '../../../providers/alerts'
import { StorageDb } from '../../../providers/storageDb'
import { CONFIG } from '../../../providers/config'

import { LoginPage } from '../login/login'
import { HomePage } from '../../app/home/home'

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
    public db: StorageDb    
    ) {

      
    }

  ionViewDidLoad() {    
    this.checkForSession()

  }

  checkForSession(){
    this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      console.log(res)      
      if(res != null){
        // if(typeof(res) === 'object'){
        if(res['user'] != ''){
          this.navCtrl.setRoot(HomePage)
        }
      }
    })
  }

  openPage(page){
    this.navCtrl.push(LoginPage, {mode: page})
  }

}
