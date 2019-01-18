import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DetailsFreightDriverPage } from './details-freight'
import { NavDriverComponentModule } from '../../../components/nav/nav.module'
import { ModalPostulationDriverModule } from '../../../components/modal-postulation/modal-postulation.module'

@NgModule({
  declarations: [
    DetailsFreightDriverPage
  ],
  imports: [
    ModalPostulationDriverModule,
    NavDriverComponentModule,
    IonicPageModule.forChild(DetailsFreightDriverPage)    
  ],
})
export class DetailsFreightDriverModule {}