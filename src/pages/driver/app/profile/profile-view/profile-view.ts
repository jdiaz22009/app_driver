import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { DataUser } from '@models/dataUser'

import { StorageDb } from '@providers/storageDb'
import { DriverAuthProvider } from '@providers/api/driverAuth'

@IonicPage()
@Component({
  selector: 'profile-driver',
  templateUrl: 'profile-view.html'
})
export class ProfileDriverPage {

  dataUser = {}  as DataUser
  data: any = [
    {thumb: './assets/imgs/perfil4.png', title: 'Mis datos básicos', summary: 'Edita datos del conductor', page: 'ProfileBasicPage'},
    {thumb: './assets/imgs/perfil4.png', title: 'Mis datos Complementarios', summary: 'Edita datos complementarios del conductor', page: 'ProfileAdditionalDriverPage'},
    {thumb: './assets/imgs/perfil3.png', title: 'Mis fotos', summary: ' Sube fotos de documentos', page: 'ProfilePhotoDriverPage'},
    {thumb: './assets/imgs/perfil2.png', title: 'Mis datos bancarios', summary: 'Para recibir pagos de la empresa', page: 'ProfileBankDriverPage'},
    {thumb: './assets/imgs/perfil.png', title: 'Mis referencias', summary: 'Te ayudara con las empresas', page: 'ProfileReferenceDriverPage'}
  ]

  userData: any = []

  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public auth: DriverAuthProvider,
    public navParams: NavParams) {


  }

  ionViewDidLoad(){
    this.getProfile()
  }

  getProfile(){
    this.auth.getDriver().then(res =>{
      // console.log('user ' + JSON.stringify(res))
      this.userData = res['data'].id_driver
    })
  }

  goPage(page){
    console.log(page)
    if(page === 'ProfileBasicPage'){
      this.navCtrl.push(page, { profile: this.userData})
    }else{
      this.navCtrl.push(page)
    }
  }

}
