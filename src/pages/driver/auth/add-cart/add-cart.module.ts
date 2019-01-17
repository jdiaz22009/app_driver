import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { AddCartDriverPage } from './add-cart'

@NgModule({
  declarations: [
    AddCartDriverPage    
  ],
  imports: [
    IonicPageModule.forChild(AddCartDriverPage)    
  ],
})
export class AddCartDriverModule {}