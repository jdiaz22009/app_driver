import { Component } from '@angular/core'
import { IonicPage, NavController, LoadingController, ModalController } from 'ionic-angular'

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
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
    ) {

  }

  ionViewDidLoad() {

  }

  myCarts(){
    this.navCtrl.push('CartsDriverPage')
  }

  myFreight(){
    this.navCtrl.push('MyFreightDriverPage')
  }

  profile(){
    this.navCtrl.push('ProfileDriverPage')
  }

  availability(){
    const modal = this.modalCtrl.create('AvailabilityDriverPage', null, { cssClass: "modal-availability" })
    modal.present()
  }

  findFreight(){
    this.navCtrl.push('FindFreightDriverPage')
  }

}
