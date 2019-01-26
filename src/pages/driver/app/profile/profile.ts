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
  data: any = [
    {thumb: './assets/imgs/perfil4.png', title: 'Mis datos basicos', summary: 'Edita datos del conductor', page: 'InformationVehiclesDriverPage'},
    {thumb: './assets/imgs/perfil4.png', title: 'Mis datos Complementarios', summary: 'Edita datos complementarios del conductor', page: 'AdditionalInfoVehiclesDriverPage'},
    {thumb: './assets/imgs/perfil3.png', title: 'Mis fotos', summary: ' Sube fotos de documentos', page: 'OwnerDataVehiclesDriverPage'},
    {thumb: './assets/imgs/perfil2.png', title: 'Mis datos bancarios', summary: 'Para recibir pagos de la empresa', page: 'PhotosVehiclesDriverPage'},
    {thumb: './assets/imgs/perfil.png', title: 'Mis referencias', summary: 'Te ayudara con las empresas', page: 'PhotosVehiclesDriverPage'}
  ]
  
  
  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public navParams: NavParams) {
     

  }

  ionViewDidLoad(){
    this.db.getItem(CONFIG.localdb.USER_DATA_KEY).then(res =>{
      this.dataUser = res
      console.log(res)
     // this.driver_name = this.dataUser.primer_nombre + ' ' + this.dataUser.primer_apellido
    })

    
  }

  goPage(page){
    this.navCtrl.push(page);
  }

}
