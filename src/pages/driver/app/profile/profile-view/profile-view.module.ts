import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProfileDriverPage } from './profile-view'

@NgModule({
  declarations: [
    ProfileDriverPage
  ],
  imports: [
    IonicPageModule.forChild(ProfileDriverPage)
  ],
})
export class ProfileDriverModule {}
