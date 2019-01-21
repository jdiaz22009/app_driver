import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ListVehiclesDriverPage } from './list-vehicles'
import { NavDriverComponentModule } from '../../../components/nav/nav.module'

@NgModule({
  declarations: [
    ListVehiclesDriverPage
  ],
  imports: [
    NavDriverComponentModule,
    IonicPageModule.forChild(ListVehiclesDriverPage)    
  ],
})
export class ListVehiclesDriverModule {}