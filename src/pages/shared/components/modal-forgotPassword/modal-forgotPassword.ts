import { Component } from '@angular/core'
import { IonicPage, ViewController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'modal-forgot-password',
  templateUrl: 'modal-forgotPassword.html'
})

export class ModalForgotPasswordComponent {

  constructor(
    public viewCtrl: ViewController
  ){

  }

  goBack(){
    this.viewCtrl.dismiss()
  }

}
