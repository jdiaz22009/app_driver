import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

import { DataUser } from '@models/dataUser'

@IonicPage()
@Component({
  selector: 'profile-driver',
  templateUrl: 'profile.html'
})
export class ProfileDriverPage {  

  dataUser = {}  as DataUser
  driver_name: string
  
  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public navParams: NavParams) {
     

  }

  ionViewDidLoad(){
    this.db.getItem(CONFIG.localdb.USER_DATA_KEY).then(res =>{
      this.dataUser = res
      console.log(res)
      this.driver_name = this.dataUser.primer_nombre + ' ' + this.dataUser.primer_apellido
    })

    
  }

}
