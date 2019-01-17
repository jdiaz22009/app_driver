import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { RegisterSharedPage } from './register'
import { ModalIdSharedModule } from '../../components/modal-id/modal-id.module'


@NgModule({
  declarations: [
    RegisterSharedPage
  ],
  imports: [
    ModalIdSharedModule,
    IonicPageModule.forChild(RegisterSharedPage)    
  ],
})
export class RegisterSharedModule {}