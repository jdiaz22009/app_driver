import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { RegisterSharedPage } from './register'


@NgModule({
  declarations: [
    RegisterSharedPage
  ],
  imports: [
    IonicPageModule.forChild(RegisterSharedPage)    
  ],
})
export class RegisterSharedModule {}