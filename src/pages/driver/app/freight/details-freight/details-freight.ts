import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'details-freight-driver',
  templateUrl: 'details-freight.html'
})
export class DetailsFreightDriverPage {
  
  offer: any = []

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public navParams: NavParams) {      
     
     this.offer = this.navParams.get('details')
  }

  accept(){
    const modal = this.modalCtrl.create('ModalPostulationDriverComponent', null, { cssClass: 'modal-id' })
        modal.onDidDismiss((data) =>{          
            if(data['mode'] === 'find'){
              this.navCtrl.popTo('FindFreightDriverPage')
            }else if(data['mode'] === 'home'){
              this.navCtrl.setRoot('home-drive')
            }
        })
        modal.present()
  }

  
}
