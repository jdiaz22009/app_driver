import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { MyFreightDriverPage } from './my-freight'

@NgModule({
  declarations: [
    MyFreightDriverPage
  ],
  imports: [
    IonicPageModule.forChild(MyFreightDriverPage)    
  ],
})
export class MyFreightDriverModule {}