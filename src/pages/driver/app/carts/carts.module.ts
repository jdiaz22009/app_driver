import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { CartsDriverPage } from './carts'

@NgModule({
  declarations: [
    CartsDriverPage
  ],
  imports: [
    IonicPageModule.forChild(CartsDriverPage)    
  ],
})
export class CartsDriverModule {}