import { Component } from '@angular/core'
import { IonicPage, NavController, ModalController } from 'ionic-angular'
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

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public auth: DriverAuthProvider,
  ) {

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
      console.log('--Home getComingSoonFletes-- error: ', e)

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
      console.log('--Home getComingSoonFletes-- error: ', e)

    })
  }


  availability() {
    const modal = this.modalCtrl.create('AvailabilityDriverPage', null, { cssClass: 'modal-availability' })
    modal.present()
  }

}
