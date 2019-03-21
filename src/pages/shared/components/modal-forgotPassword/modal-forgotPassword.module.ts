import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ContactSharedModule } from '@pages/shared/components/contact/contact.module'
import { ModalForgotPasswordComponent } from './modal-forgotPassword'

@NgModule({
  declarations: [
    ModalForgotPasswordComponent
  ],
  imports: [
    ContactSharedModule,
    IonicPageModule.forChild(ModalForgotPasswordComponent)
  ],
})
export class ModalForgotPasswordModule {}
