import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ModalListDriverComponent } from './modal-list'

@NgModule({
  declarations: [
    ModalListDriverComponent
  ],
  imports: [
    IonicPageModule.forChild(ModalListDriverComponent)
  ],
})
export class ModalListDriverModule {}
