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

  dataUser = {} as DataUser
  driver_name: string = ''
  percent_profile: number = 0
  travels: number = 0
  data: any = [
    { thumb: './assets/imgs/perfil4.png', title: 'Mis datos básicos', summary: 'Ingresa tus datos básicos', page: 'ProfileBasicPage' },
    { thumb: './assets/imgs/perfil4.png', title: 'Mis datos complementarios', summary: 'Ingresa tus datos complementarios', page: 'ProfileAdditionalDriverPage' },
    { thumb: './assets/imgs/perfil2.png', title: 'Mis datos bancarios', summary: 'Para recibir tus pagos', page: 'ProfileBankDriverPage' },
    { thumb: './assets/imgs/perfil.png', title: 'Mis referencias comerciales', summary: 'Ingresa los datos de quienes te conocen', page: 'ProfileReferenceDriverPage' },
    { thumb: './assets/imgs/perfil3.png', title: 'Mis fotos', summary: 'Sube fotos de tus documentos y tu perfil', page: 'ProfilePhotoDriverPage' }
  ]

  inputCount: number = 46
  userData: any = []

  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public auth: DriverAuthProvider,
    public navParams: NavParams) {


  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.getProfile()
  }

  getProfile() {
    this.auth.getDriver().then(res => {
      console.log('user ' + JSON.stringify(res))
      this.userData = res['data'].id_driver
      console.log('--ProfileView-- getProfile userData: ', this.userData)
      this.driver_name = this.toCapitalize(this.userData.primer_nombre) + ' ' + this.toCapitalize(this.userData.segundo_nombre)
      this.percent_profile = res['data'].percent_profile
      this.travels = this.userData.cantidad_viajes === 0 ? 0 : this.userData.cantidad_viajes
    })
  }

  goPage(page) {
    console.log(page)
    if (page === 'ProfileBankDriverPage') {
      this.navCtrl.setRoot(page, { profile: this.userData })
      console.log('--ProfileView-- goPage userData: ', this.userData)
    }else if (page === 'ProfileBasicPage' || page === 'ProfileAdditionalDriverPage' || page === 'ProfileReferenceDriverPage') {
      this.navCtrl.push(page, { profile: this.userData })
    } else {
      this.navCtrl.push(page)
    }
  }

  toCapitalize(v) {
    return v.charAt(0).toUpperCase() + v.slice(1)
  }

}
