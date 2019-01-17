import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ModalIdSharedComponent } from './modal-id'
import { ContactSharedModule } from '../contact/contact.module'

@NgModule({
  declarations: [
    ModalIdSharedComponent
  ],
  imports: [
    ContactSharedModule,
    IonicPageModule.forChild(ModalIdSharedComponent)    
  ],
})
export class ModalIdSharedModule {}