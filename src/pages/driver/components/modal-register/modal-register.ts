import { Component } from '@angular/core'
import { ViewController } from 'ionic-angular'


@Component({
  selector: 'modal-register-component',
  templateUrl: 'modal-register.html'
})

export class ModalRegisterComponent {  
  
  constructor(
    public viewCtrl: ViewController
  ){
     

  }  

  goToSignin(){
    this.viewCtrl.dismiss()
  }

}
