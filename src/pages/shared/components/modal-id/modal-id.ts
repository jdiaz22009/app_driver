import { Component } from '@angular/core'
import { ViewController } from 'ionic-angular'

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
