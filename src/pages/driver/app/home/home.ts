import { Component } from '@angular/core'
import { IonicPage, NavController, ModalController } from 'ionic-angular'

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
    public modalCtrl: ModalController
    ) {

  }

  goPage(page){
    console.log('--Home-- page: ', page)
    this.navCtrl.push(page)
  }

  getComingSoonFletes(){
    const modal = this.modalCtrl.create('ModalComingSoonComponent', null, { cssClass: 'modal-id' })
    modal.present()
  }

  getComingSoonDisponibilidad(){
    const modal = this.modalCtrl.create('ModalComingSoonComponent', null, { cssClass: 'modal-id' })
    modal.present()
  }

  getComingSoonCargas(){
    const modal = this.modalCtrl.create('ModalComingSoonComponent', null, { cssClass: 'modal-id' })
    modal.present()
  }
  

  availability(){
    const modal = this.modalCtrl.create('AvailabilityDriverPage', null, { cssClass: 'modal-availability' })
    modal.present()
  }

}
