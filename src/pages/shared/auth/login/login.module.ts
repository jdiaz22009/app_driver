import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { LoginSharedPage } from './login'

@NgModule({
  declarations: [
    LoginSharedPage
  ],
  imports: [
    IonicPageModule.forChild(LoginSharedPage)    
  ],
})
export class LoginSharedModule {}
