import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

import { DataUser } from '@models/dataUser'

@IonicPage()
@Component({
  selector: 'profile-photos-driver',
  templateUrl: 'profile-photos.html'
})
export class ProfilePhotoDriverPage {


  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public navParams: NavParams) {


  }

  ionViewDidLoad(){

  }


}
