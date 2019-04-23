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

  imgBase64: string = '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'


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
    // this.testMap()

  }

  async testMap(){
    const userId = await this.getUserId()
    const dataUpload = [
      // {model: this.imgBase64, id: userId, name: 'licenseFront'},
      // {model: this.imgBase64, id: userId, name: 'idFront'},
      {model: this.imgBase64, id: userId, name: 'idBack'},
      {model: this.imgBase64, id: userId, name: 'licenseBack'}
    ]

    let dataArray = {
      idFront: null,
      idBack: null,
      licenseFront: null,
      licenseBack: null,
      driverImg: null
    }

    const results = dataUpload.map(obj =>{
      return this.fire.uploadPicture(obj.model, obj.id, obj.name).then(res => {
        return dataArray[obj.name] = res
      }).catch(e => {
        console.error('error upload ' + e.message)
      })
    })

    Promise.all(results).then(completed =>{
      console.log('completed ' + completed)
      console.log('dataArrayComplete ' + JSON.stringify(dataArray))
    })


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

    const results = arrayImgs.map(obj =>{
      const img = obj.model.substring(23)
      return this.fire.uploadPicture(img, obj.id, obj.name).then(res => {
        return dataArray[obj.name] = res
      }).catch(e => {
        console.error('error upload ' + e.message)
        loader.dismiss()
        this.alerts.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')
      })
    })

    Promise.all(results).then(completed =>{
      console.log('completed ' + completed)
      console.log('dataArrayComplete ' + JSON.stringify(dataArray))

      this.fire.saveImageProfilePath(dataArray, userId).then(() => {
        console.log('save image path ')
        loader.dismiss()
        this.alerts.showAlert('', 'Se han guardado los datos correctamente')
      }).catch(e => {
        console.error('error dont save image paht ' + e)
        loader.dismiss()
        this.alerts.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')
      })

    })


    // const uploadEnd = await arrayImgs.forEach((item, index) => {
    //   const img = item.model.substring(23)
    //   console.log(item.model)
    //   this.fire.uploadPicture(img, item.id, item.name).then(res => {
    //     console.log(res)
    //     console.log('indexArray ' + indexArray + ' count ' + countUpload)
    //     console.log('index ' + index + 'indexArray -1 ' + (indexArray -1))

    //     if (item.name === 'idFront') {
    //       dataArray.idFront = res
    //     }

    //     if (item.name === 'idBack') {
    //       dataArray.idBack = res
    //     }

    //     if (item.name === 'licenseFront') {
    //       dataArray.licenseFront = res
    //     }

    //     if (item.name === 'licenseBack') {
    //       dataArray.licenseBack = res
    //     }

    //     if (item.name === 'driverImg') {
    //       dataArray.driverImg = res
    //     }

    //     // if (index == indexArray -1) {

    //     // }

    //     countUpload++

    //     if(countUpload === indexArray -1){
    //       return 1
    //     }

    //   //   if(countUpload === indexArray -1){
    //   //     console.log('data Arr ' + JSON.stringify(dataArray))
    //   //     this.fire.saveImageProfilePath(dataArray, userId).then(() => {
    //   //       console.log('save image path ')
    //   //     }).catch(e => {
    //   //       console.error('error dont save image paht ' + e)
    //   //     })
    //   //     loader.dismiss()
    //   //     this.alerts.showAlert('', 'Se han guardado los datos correctamente')
    //   // }

    //   }).catch(e => {
    //     console.error('error upload ' + e.message)
    //     if (index == indexArray - 1) {
    //       loader.dismiss()
    //       this.alerts.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')
    //     }
    //   })

    // })



  }

}
