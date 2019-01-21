import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DetailsVehiclesDriverPage } from './details-vehicles'
import { NavDriverComponentModule } from '../../../components/nav/nav.module'

@NgModule({
  declarations: [
    DetailsVehiclesDriverPage
  ],
  imports: [    
    NavDriverComponentModule,
    IonicPageModule.forChild(DetailsVehiclesDriverPage)    
  ],
})
export class DetailsVehiclesDriverModule {}