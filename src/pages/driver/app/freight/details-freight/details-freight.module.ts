import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DetailsFreightDriverPage } from './details-freight'
import { NavDriverComponentModule } from '../../../components/nav/nav.module'

@NgModule({
  declarations: [
    DetailsFreightDriverPage
  ],
  imports: [
    NavDriverComponentModule,
    IonicPageModule.forChild(DetailsFreightDriverPage)    
  ],
})
export class DetailsFreightDriverModule {}