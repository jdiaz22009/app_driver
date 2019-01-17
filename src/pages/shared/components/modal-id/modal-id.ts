import { Component } from '@angular/core'
import { IonicPage, ViewController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'modal-id-shared',
  templateUrl: 'modal-id.html'
})

export class ModalIdSharedComponent {  
  
  constructor(
    public viewCtrl: ViewController
  ){     

  }  

  goToSignin(){
    this.viewCtrl.dismiss()
  }

}
