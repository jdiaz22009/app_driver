import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProgressFreightDriverPage } from './progress-freight'
import { ModalQualifyDriverModule } from './../../../components/modal-qualify/modal-qualify.module'
import { ContactSharedModule } from '@pages/shared/components/contact/contact.module'
@NgModule({
  declarations: [
    ProgressFreightDriverPage
  ],
  imports: [
    ModalQualifyDriverModule,
    ContactSharedModule,
    IonicPageModule.forChild(ProgressFreightDriverPage)
  ],
})
export class ProgressFreightDriverModule {}
