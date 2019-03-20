import { AlertsProvider } from '@providers/alerts';
import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, LoadingController } from 'ionic-angular'

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
    public alerts: AlertsProvider,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private fire: FirebaseProvider,
    public navParams: NavParams) {


  }

  ionViewDidLoad(){
    // this.getProfilePicture()
  }

  async getProfilePicture(){
    const userId = await this.getUserId()
    this.fire.getProfilePicture(userId).then(res =>{
      console.log(res)
    })

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
        const photo = data.cropResult

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


        }
      })
      modal.present()

    }).catch(e =>{
      console.error(e)
    })
  }

  async getUserId(){
    const id = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      return res.userId
    })
    return id
  }

  async save(){
      const loader = this.loadingCtrl.create({})
      loader.present()

      const userId = await this.getUserId()

      let arrayImgs = []

      if(this.idFront != this.noImg){
        arrayImgs.push({
          model: this.idFront,
          id: userId,
          name: 'idFront'
        })
      }

      if(this.idBack != this.noImg){
        arrayImgs.push({
          model: this.idBack,
          id: userId,
          name: 'idBack'
        })
      }

      if(this.licenseFront != this.noImg){
        arrayImgs.push({
          model: this.licenseFront,
          id: userId,
          name: 'licenseFront'
        })
      }

      if(this.licenseBack != this.noImg){
        arrayImgs.push({
          model: this.licenseBack,
          id: userId,
          name: 'licenseBack'
        })
      }

      if(this.driverImg != this.noImg){
        arrayImgs.push({
          model: this.driverImg,
          id: userId,
          name: 'driverImg'
        })
      }

      const indexArray = arrayImgs.length
      arrayImgs.forEach((item, index) =>{

        this.fire.uploadPicture(item.model, item.id, item.name).then(res =>{
          console.log(res)
          console.log(JSON.stringify(res))
          if(index == indexArray -1){
            loader.dismiss()
            this.alerts.showAlert('', 'Se han guardado los datos correctamente')
          }
        }).catch(e =>{
          if(index == indexArray -1){
            loader.dismiss()
            this.alerts.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')
          }
        })

      })


  }

}
