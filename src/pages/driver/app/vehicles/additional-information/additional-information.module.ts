import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { AdditionalInfoVehiclesDriverPage } from './additional-information'
import { NavDriverComponentModule } from '../../../components/nav/nav.module'

@NgModule({
  declarations: [
    AdditionalInfoVehiclesDriverPage
  ],
  imports: [    
    NavDriverComponentModule,
    IonicPageModule.forChild(AdditionalInfoVehiclesDriverPage)    
  ],
})
export class AdditionalInfoVehiclesDriverModule {}