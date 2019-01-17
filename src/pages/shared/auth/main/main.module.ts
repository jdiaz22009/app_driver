import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { MainSharedPage } from './main'

@NgModule({
  declarations: [
    MainSharedPage
  ],
  imports: [
    IonicPageModule.forChild(MainSharedPage)    
  ],
})
export class MainSharedModule {}