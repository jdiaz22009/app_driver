import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { LoginSharedPage } from './login'

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule, MatInputModule } from '@angular/material'

@NgModule({
  declarations: [
    LoginSharedPage
  ],
  imports: [
    IonicPageModule.forChild(LoginSharedPage),
    // BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class LoginSharedModule {}
