import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ContactSharedModule } from '@pages/shared/components/contact/contact.module'
import { ModalComingSoonComponent } from './modal-comingSoon'

@NgModule({
  declarations: [
    ModalComingSoonComponent
  ],
  imports: [
    ContactSharedModule,
    IonicPageModule.forChild(ModalComingSoonComponent)
  ],
})
export class ModalForgotPasswordModule {}
