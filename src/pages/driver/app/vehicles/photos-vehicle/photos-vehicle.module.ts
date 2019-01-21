import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PhotosVehiclesDriverPage } from './photos-vehicle'

@NgModule({
  declarations: [
    PhotosVehiclesDriverPage
  ],
  imports: [    
    IonicPageModule.forChild(PhotosVehiclesDriverPage)    
  ],
})

export class PhotosVehiclesDriverModule {}