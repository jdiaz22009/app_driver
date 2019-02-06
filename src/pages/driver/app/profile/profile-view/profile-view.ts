import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

import { DataUser } from '@models/dataUser'

@IonicPage()
@Component({
  selector: 'profile-driver',
  templateUrl: 'profile-view.html'
})
export class ProfileDriverPage {

  dataUser = {}  as DataUser
  driver_name: string
  data: any = [
    {thumb: './assets/imgs/perfil4.png', title: 'Mis datos básicos', summary: 'Edita datos del conductor', page: 'ProfileBasicPage'},
    {thumb: './assets/imgs/perfil4.png', title: 'Mis datos Complementarios', summary: 'Edita datos complementarios del conductor', page: 'ProfileAdditionalDriverPage'},
    {thumb: './assets/imgs/perfil3.png', title: 'Mis fotos', summary: ' Sube fotos de documentos', page: 'ProfilePhotoDriverPage'},
    {thumb: './assets/imgs/perfil2.png', title: 'Mis datos bancarios', summary: 'Para recibir pagos de la empresa', page: 'ProfileBankDriverPage'},
    {thumb: './assets/imgs/perfil.png', title: 'Mis referencias', summary: 'Te ayudara con las empresas', page: 'ProfileReferenceDriverPage'}
  ]


  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public navParams: NavParams) {


  }

  ionViewDidLoad(){

  }

  goPage(page){
    this.navCtrl.push(page)
  }

}
