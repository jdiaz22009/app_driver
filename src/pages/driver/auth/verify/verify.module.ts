import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { VerifyDriverPage } from './verify'

@NgModule({
  declarations: [
    VerifyDriverPage    
  ],
  imports: [
    IonicPageModule.forChild(VerifyDriverPage)    
  ],
})
export class VerifyDriverModule {}