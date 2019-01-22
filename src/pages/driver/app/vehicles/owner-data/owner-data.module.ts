import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { OwnerDataVehiclesDriverPage } from './owner-data'
import { NavDriverComponentModule } from '../../../components/nav/nav.module'


@NgModule({
  declarations: [
    OwnerDataVehiclesDriverPage
  ],
  imports: [    
    NavDriverComponentModule,
    IonicPageModule.forChild(OwnerDataVehiclesDriverPage)    
  ],
})
export class OwnerDataVehiclesDriverModule {}