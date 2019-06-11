import { Component } from '@angular/core'
import { IonicPage, ViewController, NavParams } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'modal-postulation-driver',
  templateUrl: 'modal-postulation.html'
})

export class ModalPostulationDriverComponent {

  offer: any

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ){
    this.offer = this.navParams.get('offer')
  }

  goBack(mode){
    this.viewCtrl.dismiss({mode: mode})
  }

}
