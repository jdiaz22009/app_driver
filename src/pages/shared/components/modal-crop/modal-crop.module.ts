import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ModalCropSharedComponent } from './modal-crop'

import { ImageCropperModule } from 'ng2-img-cropper/index'

@NgModule({
  declarations: [
    ModalCropSharedComponent
  ],
  imports: [
    ImageCropperModule,
    IonicPageModule.forChild(ModalCropSharedComponent)
  ],
})
export class ModalCropSharedModule {}
