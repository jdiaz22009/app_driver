import { Injectable } from '@angular/core'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { File } from '@ionic-native/file'


import * as watermark from 'watermarkjs'
@Injectable()
export class MediaProvider {

  constructor(
    private camera: Camera,
    public file: File
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

    // takePictureWithWatermark(){
    //   return new Promise((resolve, reject) =>{
    //     const options: CameraOptions = {
    //       quality: 100,
    //       destinationType: this.camera.DestinationType.DATA_URL,  //FILE_URI,  //DATA_URL,
    //       encodingType: this.camera.EncodingType.JPEG,
    //       mediaType: this.camera.MediaType.PICTURE,
    //       correctOrientation: true,
    //       sourceType: 1,
    //     }

    //     this.camera.getPicture(options).then((imgData) => {
    //       let base64Image = 'data:image/jpeg;base64,' + imgData
    //       // const itemSrc = imgData.replace(/^file:\/\//, '')

    //       // this.makeFileIntoBlob(imgData).then(res =>{
    //       //   console.log(res)
    //       //   this.addWaterMark(res['imgBlob']).then(res =>{
    //       //     resolve(res)
    //       //   })
    //       // })

    //       fetch(base64Image)
    //       .then(res => res.blob())
    //       .then(blob => {
    //         this.addWaterMark(blob).then(res =>{
    //           resolve(res)
    //         })
    //       });

    //      }, (e) => {
    //       console.error(e)
    //       reject(e)
    //      })
    //   })
    // }

    // addWaterMark(uri){
    //   return new Promise(resolve =>{
    //     const date = new Date().toLocaleString('en-GB', {"year":"2-digit","month":"2-digit","day":"2-digit","hour":"2-digit","minute":"2-digit"})
    //     watermark([uri])
    //       .image(watermark.text.lowerRight('Perafo JS', '28px serif', '#fff', 0.5))
    //       .then(img => {
    //           resolve(img.src)
    //       })
    //   })
    // }

    // makeFileIntoBlob(_imagePath) {
    //   return new Promise((resolve, reject) => {
    //     let fileName = "";
    //     this.file
    //       .resolveLocalFilesystemUrl(_imagePath)
    //       .then(fileEntry => {
    //         let { name, nativeURL } = fileEntry
    //         let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"))
    //         fileName = name;
    //         // we are provided the name, so now read the file into a buffer
    //         return this.file.readAsArrayBuffer(path, name);
    //       })
    //       .then(buffer => {
    //         let imgBlob = new Blob([buffer], {
    //           type: "image/jpeg"
    //         });
    //         resolve({
    //           fileName,
    //           imgBlob
    //         });
    //       })
    //       .catch(e => reject(e));
    //   });
    // }

}


