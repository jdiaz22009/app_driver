import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { InformationVehiclesDriverPage } from './information-vehicle'

@NgModule({
  declarations: [
    InformationVehiclesDriverPage  
  ],
  imports: [
    
    IonicPageModule.forChild(InformationVehiclesDriverPage)    
  ],
})
export class InformationVehiclesDriverModule {}