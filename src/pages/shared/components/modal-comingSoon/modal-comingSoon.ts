import { Component } from '@angular/core'
import { IonicPage, ViewController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'modal-coming-soon',
  templateUrl: 'modal-comingSoon.html'
})

export class ModalComingSoonComponent {

  constructor(
    public viewCtrl: ViewController
  ){

  }

  goBack(){
    this.viewCtrl.dismiss()
  }

}
