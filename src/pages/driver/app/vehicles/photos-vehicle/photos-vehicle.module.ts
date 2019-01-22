import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PhotosVehiclesDriverPage } from './photos-vehicle'
import { NavDriverComponentModule } from '@pages/driver/components/nav/nav.module'

@NgModule({
  declarations: [
    PhotosVehiclesDriverPage
  ],
  imports: [    
    NavDriverComponentModule,
    IonicPageModule.forChild(PhotosVehiclesDriverPage)    
  ],
})

export class PhotosVehiclesDriverModule {}