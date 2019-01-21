import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { CartsDriverPage } from './carts'
import { NavDriverComponentModule } from '../../components/nav/nav.module';


@NgModule({
  declarations: [
    CartsDriverPage
  ],
  imports: [
    NavDriverComponentModule,
    IonicPageModule.forChild(CartsDriverPage)    
  ],
})
export class CartsDriverModule {}