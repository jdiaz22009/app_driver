import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { InformationVehiclesDriverPage } from './information-vehicle'
import { NavDriverComponentModule } from '../../../components/nav/nav.module'

@NgModule({
  declarations: [
    InformationVehiclesDriverPage  
  ],
  imports: [
    NavDriverComponentModule,
    IonicPageModule.forChild(InformationVehiclesDriverPage)    
  ],
})
export class InformationVehiclesDriverModule {}