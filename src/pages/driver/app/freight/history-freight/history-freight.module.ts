import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HistoryFreightDriverPage } from './history-freight'
import { ModalQualifyDriverModule } from '../../../components/modal-qualify/modal-qualify.module'
import { ContactSharedModule } from '@pages/shared/components/contact/contact.module'
@NgModule({
  declarations: [
    HistoryFreightDriverPage
  ],
  imports: [
    ModalQualifyDriverModule,
    ContactSharedModule,
    IonicPageModule.forChild(HistoryFreightDriverPage)
  ],
})
export class HistoryFreightDriverModule {}
