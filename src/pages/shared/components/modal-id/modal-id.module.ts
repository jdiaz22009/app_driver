import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ModalIdSharedComponent } from './modal-id'

@NgModule({
  declarations: [
    ModalIdSharedComponent
  ],
  imports: [
    IonicPageModule.forChild(ModalIdSharedComponent)    
  ],
})
export class ModalIdSharedModule {}