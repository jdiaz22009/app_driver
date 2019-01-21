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
    this.navCtrl.push(page)
  }  

  availability(){
    const modal = this.modalCtrl.create('AvailabilityDriverPage', null, { cssClass: 'modal-availability' })
    modal.present()
  }  

}
