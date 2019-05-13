import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { FindFreightDriverPage } from './find-freight'

import { NavDriverComponentModule } from '../../../components/nav/nav.module'
import { ModalRadioDriverModule } from '../../../components/modal-radio/modal-radio.module'

@NgModule({
  declarations: [
    FindFreightDriverPage
  ],
  imports: [
    NavDriverComponentModule,
    ModalRadioDriverModule,
    IonicPageModule.forChild(FindFreightDriverPage)
  ],
})
export class FindFreightDriverModule {}
