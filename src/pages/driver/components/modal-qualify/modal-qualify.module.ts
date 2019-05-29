import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ContactSharedModule } from '@pages/shared/components/contact/contact.module'
import { ModalQualifyDriverComponent } from './modal-qualify'

@NgModule({
  declarations: [
    ModalQualifyDriverComponent
  ],
  imports: [
    ContactSharedModule,
    IonicPageModule.forChild(ModalQualifyDriverComponent)
  ],
})
export class ModalQualifyDriverModule {}
