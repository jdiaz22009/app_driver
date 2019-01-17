import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { AvailabilityDriverPage } from './availability'

@NgModule({
  declarations: [
    AvailabilityDriverPage
  ],
  imports: [
    IonicPageModule.forChild(AvailabilityDriverPage)    
  ],
})
export class AvailabilityDriverModule {}