import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { AddCartDriverPage } from './add-cart'
import { ModalRadioDriverModule } from './../../components/modal-radio/modal-radio.module'

@NgModule({
  declarations: [
    AddCartDriverPage
  ],
  imports: [
    ModalRadioDriverModule,
    IonicPageModule.forChild(AddCartDriverPage)
  ],
})
export class AddCartDriverModule {}
