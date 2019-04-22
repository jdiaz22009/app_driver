import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PhotosMyVehiclesDriverPage } from './photos-my-vehicle'
import { NavDriverComponentModule } from '@pages/driver/components/nav/nav.module'

@NgModule({
  declarations: [
    PhotosMyVehiclesDriverPage
  ],
  imports: [
    NavDriverComponentModule,
    IonicPageModule.forChild(PhotosMyVehiclesDriverPage)
  ],
})

export class PhotosMyVehiclesDriverModule {}
