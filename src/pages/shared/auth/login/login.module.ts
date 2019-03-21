import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { LoginSharedPage } from './login'

import { ModalForgotPasswordModule } from './../../components/modal-forgotPassword/modal-forgotPassword.module'


@NgModule({
  declarations: [
    LoginSharedPage
  ],
  imports: [
    IonicPageModule.forChild(LoginSharedPage),
    ModalForgotPasswordModule
  ],
})
export class LoginSharedModule {}
