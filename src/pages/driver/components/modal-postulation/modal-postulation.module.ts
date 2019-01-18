import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ContactSharedModule } from '@pages/shared/components/contact/contact.module'
import { ModalPostulationDriverComponent } from './modal-postulation'

@NgModule({
  declarations: [
    ModalPostulationDriverComponent
  ],
  imports: [
    ContactSharedModule,
    IonicPageModule.forChild(ModalPostulationDriverComponent)    
  ],
})
export class ModalPostulationDriverModule {}