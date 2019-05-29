import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProgressFreightDriverPage } from './progress-freight'
import { ModalQualifyDriverModule } from './../../../components/modal-qualify/modal-qualify.module'
@NgModule({
  declarations: [
    ProgressFreightDriverPage
  ],
  imports: [
    ModalQualifyDriverModule,
    IonicPageModule.forChild(ProgressFreightDriverPage)
  ],
})
export class ProgressFreightDriverModule {}
