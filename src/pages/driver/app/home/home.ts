import { Component } from '@angular/core'
import { IonicPage, NavController, ModalController, Platform } from 'ionic-angular'

import { AppVersion } from '@ionic-native/app-version'

import { DriverAuthProvider } from '@providers/api/driverAuth'

@IonicPage({
  name: 'home-drive',
  segment: 'home-drive'
})
@Component({
  selector: 'home-driver',
  templateUrl: 'home.html'
})
export class HomeDriverPage {

  version: string = ''
  offerCount: number = 0

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public auth: DriverAuthProvider,
    public plt: Platform,
    private appVersion: AppVersion
  ) {

  }

  ionViewDidLoad(){
    this.getAppVersion()

  }

  ionViewDidEnter() {
    this.getOfferCount()
  }

  getOfferCount(){
    this.auth.getOfferCount().then(res =>{
      // console.log(res)
      if(res){
        this.offerCount = res['data'].disponibles
      }
    })
  }

  getAppVersion(){
    if(this.plt.is('cordova')){
      this.appVersion.getVersionNumber().then(res =>{
        this.version = res
      })
    }
  }

  goPage(page) {
    console.log('--Home-- page: ', page)
    this.navCtrl.push(page)
  }

  getComingSoonFletes() {
    const modal = this.modalCtrl.create('ModalComingSoonComponent', null, { cssClass: 'modal-id' })
    modal.present()
    const paramas = {
      request: 'FLETES'
    }
    this.auth.ComingSoon(paramas).then(res => {
      console.log('--Home getComingSoonFletes-- res: ', res)

    }).catch(e => {
      console.log('--Home getComingSoonFletes-- error: ', e)

    })
  }

  getComingSoonDisponibilidad() {
    const modal = this.modalCtrl.create('ModalComingSoonComponent', null, { cssClass: 'modal-id' })
    modal.present()
    const paramas = {
      request: 'DISPONIBILIDAD'
    }
    this.auth.ComingSoon(paramas).then(res => {
      console.log('--Home getComingSoonFletes-- res: ', res)
    }).catch(e => {
      console.error('--Home getComingSoonFletes-- error: ', e)

    })
  }

  getComingSoonCargas() {
    const modal = this.modalCtrl.create('ModalComingSoonComponent', null, { cssClass: 'modal-id' })
    modal.present()
    const paramas = {
      request: 'CARGAS'
    }
    this.auth.ComingSoon(paramas).then(res => {
      console.log('--Home getComingSoonFletes-- res: ', res)
    }).catch(e => {
      console.error('--Home getComingSoonFletes-- error: ', e)

    })
  }


  availability() {
    const modal = this.modalCtrl.create('AvailabilityDriverPage', null, { cssClass: 'modal-availability' })
    modal.present()
  }

}
