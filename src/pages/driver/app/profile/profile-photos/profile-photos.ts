import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '@providers/alerts'
import { MediaProvider } from '@providers/media'
import { StorageDb } from '@providers/storageDb'
import { FirebaseProvider } from '@providers/firebase'
import { CONFIG } from '@providers/config'
import { DriverAuthProvider } from '@providers/api/driverAuth'

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
    public driveAuth: DriverAuthProvider,
    public navParams: NavParams) {


  }

  ionViewDidLoad() {
    this.getProfilePicture()
  }

  async getProfilePicture(){
    const loader = this.loadingCtrl.create({})
    loader.present()
    const userId = await this.getUserId()

    this.fire.getProfilePicture(userId).then(res =>{
      loader.dismiss()

      console.log(JSON.stringify(res))

      if(res === null) return

      if(res['idFront'] !== undefined){
        this.idFront = res['idFront']
      }

      if(res['idBack'] !== undefined){
        this.idBack = res['idBack']
      }

      if(res['licenseFront'] !== undefined){
        this.licenseFront = res['licenseFront']
      }

      if(res['licenseBack'] !== undefined){
        this.licenseBack = res['licenseBack']
      }

      if(res['driverImg'] !== undefined){
        this.driverImg = res['driverImg']
      }

    }).catch(e =>{
      loader.dismiss()
      console.error('error ' + e)
    })

  }

  setPicture(id) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Subir foto',
      buttons: [
        {
          text: 'Tomar Foto',
          role: 'takePicture',
          handler: () => {
            this.takePicture(id, 1)
          }
        }, {
          text: 'Seleccionar de Galería',
          role: 'takePicture',
          handler: () => {
            this.takePicture(id, 0)
          }
        }, {
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


  async getUserId() {
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
      return res.userId
    })
  }

  isBase64Img(str) {
    try {
        return str.includes('data:image/jpeg;base64')
    } catch (e) {
        return false
    }
}

  async save() {

    const loader = this.loadingCtrl.create({})
    loader.present()

    const userId = await this.getUserId()
    console.log(userId)

    let arrayImgs = []

    let dataArray = {
      idFront: null,
      idBack: null,
      licenseFront: null,
      licenseBack: null,
      driverImg: null
    }

    if (this.idFront != this.noImg && this.isBase64Img(this.idFront)) {
      arrayImgs.push({
        model: this.idFront,
        id: userId,
        name: 'idFront'
      })
    }else{
      dataArray.idFront = this.idFront === this.noImg ? null : this.idFront
    }

    if (this.idBack != this.noImg && this.isBase64Img(this.idBack)) {
      arrayImgs.push({
        model: this.idBack,
        id: userId,
        name: 'idBack'
      })
    }else{
      dataArray.idBack = this.idBack === this.noImg ? null : this.idBack
    }

    if (this.licenseFront != this.noImg && this.isBase64Img(this.licenseFront)) {
      arrayImgs.push({
        model: this.licenseFront,
        id: userId,
        name: 'licenseFront'
      })
    }else{
      dataArray.licenseFront = this.licenseFront === this.noImg ? null : this.licenseFront
    }

    if (this.licenseBack != this.noImg && this.isBase64Img(this.licenseBack)) {
      arrayImgs.push({
        model: this.licenseBack,
        id: userId,
        name: 'licenseBack'
      })
    }else{
      dataArray.licenseBack = this.licenseBack === this.noImg ? null : this.licenseBack
    }

    if (this.driverImg != this.noImg && this.isBase64Img(this.driverImg)) {
      arrayImgs.push({
        model: this.driverImg,
        id: userId,
        name: 'driverImg'
      })
    }else{
      dataArray.driverImg = this.driverImg === this.noImg ? null : this.driverImg
    }

    const indexArray = arrayImgs.length

    console.log('data Array ' + JSON.stringify(dataArray))

    arrayImgs.forEach((item, index) => {
      // console.log('upload ' + item.model)
      const img = item.model.substring(23)
      console.log('upload ' + img)
      this.fire.uploadPicture(img, item.id, item.name).then(res => {
        console.log(res)

        // if (item.model === this.idFront) {
          if (item.name === 'idFront') {
          dataArray.idFront = res
        }

        // if (item.model === this.idBack) {
        if (item.name === 'idBack') {
          dataArray.idBack = res
        }

        // if (item.model === this.licenseFront) {
        if (item.name === 'licenseFront') {
          dataArray.licenseFront = res
        }

        // if (item.model === this.licenseBack) {
          if (item.name === 'licenseBack') {
          dataArray.licenseBack = res
        }

        // if (item.model === this.driverImg) {
          if (item.name === 'driverImg') {
          dataArray.driverImg = res
        }

        if (index == indexArray -1) {

          setTimeout(() =>{
            console.log('data Arr ' + JSON.stringify(dataArray))
            this.fire.saveImageProfilePath(dataArray, userId).then(() => {
              console.log('save image path ')
            }).catch(e => {
              console.error('error dont save image paht ' + e)
            })
            loader.dismiss()
            this.alerts.showAlert('', 'Se han guardado los datos correctamente')
          }, 2000)

        }
      }).catch(e => {
        console.error('error upload ' + e.message)
        if (index == indexArray - 1) {
          loader.dismiss()
          this.alerts.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')
        }
      })

    })

    // this.fire.saveImageProfilePath(dataArray, userId).then(() => {
    //   console.log('save image path ')
    // }).catch(e => {
    //   console.error('error dont save image paht ' + e)
    // })


  }

}
