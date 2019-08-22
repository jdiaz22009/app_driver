import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HistoryFreightDriverPage } from './history-freight'
import { ModalQualifyDriverModule } from '../../../components/modal-qualify/modal-qualify.module'
@NgModule({
  declarations: [
    HistoryFreightDriverPage
  ],
  imports: [
    ModalQualifyDriverModule,
    IonicPageModule.forChild(HistoryFreightDriverPage)
  ],
})
export class HistoryFreightDriverModule {}
