import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '@providers/alerts'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

@IonicPage()
@Component({
  selector: 'main-shared',
  templateUrl: 'main.html',
})
export class MainSharedPage {

  showContent: boolean = true;

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
      if(res != null){
        this.showContent = false
        if(res['type'] === 'driver'){
          this.navCtrl.setRoot('home-drive')
        }else if(res['type'] === 'company'){
          this.navCtrl.setRoot('home-company')
        }
      }
    })
  }

  openPage(page){
    this.navCtrl.push('LoginSharedPage', {mode: page})
  }

}
