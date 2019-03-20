import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular'

import { MediaProvider } from '@providers/media'
import { StorageDb } from '@providers/storageDb'
import { FirebaseProvider } from '@providers/firebase'
import { CONFIG } from '@providers/config'

import { DataUser } from '@models/dataUser'

@IonicPage()
@Component({
  selector: 'profile-photos-driver',
  templateUrl: 'profile-photos.html'
})
export class ProfilePhotoDriverPage {  

  noImg: string = './assets/imgs/no_photo.png'
  idFront: string = this.noImg
  idBack: string = this.noImg
  licenseFront: string = this.noImg
  licenseBack: string = this.noImg
  driverImg: string = this.noImg


  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    public media: MediaProvider,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private fire: FirebaseProvider,
    public navParams: NavParams) {


  }

  ionViewDidLoad(){

  }

  setPicture(id){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Subir foto',
      buttons: [
        {
          text: 'Tomar Foto',
          role: 'takePicture',
          handler: () => {
            this.takePicture(id, 1)
          }
        },{
          text: 'Seleccionar de Galería',
          role: 'takePicture',
          handler: () => {
            this.takePicture(id, 0)
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked')
          }
        }
      ]
    })
    actionSheet.present()
  }

  takePicture(modelPicture, mode){
    this.media.takePicture(mode).then(res =>{
      const modal = this.modalCtrl.create('ModalCropSharedComponent', { picture: res })
      modal.onDidDismiss(data =>{
        if(data){
         console.log(data)
         console.log(data.cropResult)
         //data:image/jpeg;base64,
        //  const photo = data.cropResult.replace('data:image/jpeg;base64,', '')
        const photo = data.cropResult
        console.log('model picture ' + modelPicture + " " + photo)
        if(modelPicture === 'idFront'){
          this.idFront = photo
        }else if(modelPicture === 'idBack'){
          this.idBack = photo
        }else if(modelPicture === 'licenseFront'){
          this.licenseFront = photo
        }else if(modelPicture === 'licenseBack'){
          this.licenseBack = photo
        }else if(modelPicture === 'driverImg'){
          this.driverImg = photo
        }

        modelPicture = photo
         this.fire.uploadPicture(photo).then(res =>{
           console.log(res)
         })
        }
      })
      modal.present()

    }).catch(e =>{
      console.error(e)
    })
  }


}
