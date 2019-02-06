import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

@IonicPage()
@Component({
  selector: 'profile-additional-driver',
  templateUrl: 'profile-additional.html'
})
export class ProfileAdditionalDriverPage {


  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public navParams: NavParams) {


  }

  ionViewDidLoad(){

  }

}
