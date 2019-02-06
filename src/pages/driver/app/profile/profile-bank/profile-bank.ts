import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { StorageDb } from '@providers/storageDb'

@IonicPage()
@Component({
  selector: 'profile-bank-driver',
  templateUrl: 'profile-bank.html'
})
export class ProfileBankDriverPage {


  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public navParams: NavParams) {


  }

  ionViewDidLoad(){

  }


}
