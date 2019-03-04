import { Injectable } from '@angular/core'
import { Camera, CameraOptions } from '@ionic-native/camera'

@Injectable()
export class MediaProvider {

  constructor(
    private camera: Camera

    ){

    }

    takePicture(sourceType: number){
      return new Promise((resolve, reject) =>{
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType: sourceType,
        }

        this.camera.getPicture(options).then((imgData) => {
          let base64Image = 'data:image/jpeg;base64,' + imgData
          resolve(base64Image)
         }, (e) => {
          console.error(e)
          reject(e)
         })
      })
    }

    choosePicture(){

    }
}


