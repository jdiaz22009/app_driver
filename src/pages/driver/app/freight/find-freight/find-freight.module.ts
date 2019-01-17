import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { FindFreightDriverPage } from './find-freight'
import { NavDriverComponentModule } from '../../../components/nav/nav.module'

@NgModule({
  declarations: [
    FindFreightDriverPage
  ],
  imports: [
    NavDriverComponentModule,
    IonicPageModule.forChild(FindFreightDriverPage)    
  ],
})
export class FindFreightDriverModule {}