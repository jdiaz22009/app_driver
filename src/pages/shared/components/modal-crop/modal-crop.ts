import { Component, ViewChild } from '@angular/core'
import { IonicPage, ViewController, NavParams } from 'ionic-angular'

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper'

@IonicPage()
@Component({
  selector: 'modal-crop-shared',
  templateUrl: 'modal-crop.html'
})

export class ModalCropSharedComponent {

  myPhoto: any

	@ViewChild('cropper') ImageCropper : ImageCropperComponent

	data: any
	cropperSettings: CropperSettings
	croppedWidth: number
	croppedHeight: number
	canSave: boolean = false

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
  ){


		this.myPhoto = this.navParams.get('picture')

		this.cropperSettings = new CropperSettings()

		// Hide the default file input for image selection (we'll be using the Camera plugin instead)
		this.cropperSettings.noFileInput = true

		// Create a new cropped image object when the cropping tool is resized
		this.cropperSettings.cropOnResize = true

		// We want to convert the file type for a cropped image to a JPEG format
		this.cropperSettings.fileType = 'image/jpeg'


		// We want to be able to adjust the size of the cropping tool by dragging from any corner in any direction
		// Cannot set keepAspect to false on rounded cropper
		this.cropperSettings.keepAspect = true

    this.cropperSettings.croppedWidth = 200
    this.cropperSettings.croppedHeight = 200
    this.cropperSettings.canvasWidth = 400
		this.cropperSettings.canvasHeight = 400

		this.data = {}


		const image = new Image()
		image.src = this.myPhoto
		image.onload = () => {
			this.ImageCropper.setImage(image)
		}

  }


	handleCropping(bounds : Bounds){
    this.croppedHeight = bounds.bottom - bounds.top
    this.croppedWidth = bounds.right - bounds.left
    this.canSave = true
 }

 save(){
  //  console.dir(this.data.image)
   if(this.data.image != ''){
     this.viewCtrl.dismiss({cropResult: this.data.image})
   } else {
     alert('Not found image')
   }
 }

  closeModal() {
   this.viewCtrl.dismiss()
  }

}
