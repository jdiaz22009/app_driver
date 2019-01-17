import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { SupportSharedPage } from './support'

@NgModule({
  declarations: [
    SupportSharedPage
  ],
  imports: [
    IonicPageModule.forChild(SupportSharedPage)    
  ],
})
export class SupportSharedModule {}