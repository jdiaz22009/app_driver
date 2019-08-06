import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DetailsFreightDriverPage } from './details-freight'
import { NavDriverComponentModule } from '../../../components/nav/nav.module'
import { ModalPostulationDriverModule } from '../../../components/modal-postulation/modal-postulation.module'
import { ContactSharedModule } from '@pages/shared/components/contact/contact.module'

@NgModule({
  declarations: [
    DetailsFreightDriverPage
  ],
  imports: [
    ModalPostulationDriverModule,
    NavDriverComponentModule,
    ContactSharedModule,
    IonicPageModule.forChild(DetailsFreightDriverPage)
  ],
})
export class DetailsFreightDriverModule {}
