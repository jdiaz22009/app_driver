import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProfilePhotoDriverPage } from './profile-photos'

@NgModule({
  declarations: [
    ProfilePhotoDriverPage
  ],
  imports: [
    IonicPageModule.forChild(ProfilePhotoDriverPage)
  ],
})
export class ProfilePhotoDriverModule {}
