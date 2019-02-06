import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { StorageDb } from '@providers/storageDb'

@IonicPage()
@Component({
  selector: 'profile-reference-driver',
  templateUrl: 'profile-reference.html'
})
export class ProfileReferenceDriverPage {


  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public navParams: NavParams) {


  }

  ionViewDidLoad(){

  }


}
