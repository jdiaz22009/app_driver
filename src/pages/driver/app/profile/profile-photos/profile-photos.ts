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

  pictureMode: number = 0

  picturesObj = [
    {name: 'idFront'},
    {name: 'idBack'},
    {name: 'licenseFront'},
    {name: 'licenseBack'},
    {name: 'driverImg'}
  ]

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

    this.fire.getProfilePicture(this.pictureMode, userId, null).then(res =>{

      if(res !== null){
        this.picturesObj.map(picture =>{
          if(res[picture.name] !== undefined && res[picture.name].includes('http')){
            this[picture.name] = res[picture.name]
          }
        })
      }

      loader.dismiss()

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
        },
        {
          text: 'Seleccionar de Galería',
          role: 'takePicture',
          handler: () => {
            this.takePicture(id, 0)
          }
        },
        {
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
          this[modelPicture] = data.cropResult
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

    let dataArray = {}

    this.picturesObj.map(obj =>{
      if(this[obj.name] != this.noImg && this.isBase64Img(this[obj.name])){
        arrayImgs.push({ model: this[obj.name], id: userId, name: obj.name})
      }else{
        dataArray[obj.name] = this[obj.name] === this.noImg ? null : this[obj.name]
      }
    })

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
      this.fire.saveImageProfilePath(this.pictureMode, dataArray, userId, null).then(() => {
        console.log('save image path ')
        loader.dismiss()
        this.navCtrl.pop()
        this.alerts.showAlert('', 'Se han guardado los datos correctamente')
      }).catch(e => {
        console.error('Error to save image path ' + e)
        loader.dismiss()
        this.alerts.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')
      })

    })
  }

}
