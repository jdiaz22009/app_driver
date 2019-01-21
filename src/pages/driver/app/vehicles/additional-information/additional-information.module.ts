import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { AdditionalInfoVehiclesDriverPage } from './additional-information'

@NgModule({
  declarations: [
    AdditionalInfoVehiclesDriverPage
  ],
  imports: [    
    IonicPageModule.forChild(AdditionalInfoVehiclesDriverPage)    
  ],
})
export class AdditionalInfoVehiclesDriverModule {}