import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams , ActionSheetController, ModalController,LoadingController} from 'ionic-angular'
import { MediaProvider } from '@providers/media'
import { StorageDb } from '@providers/storageDb'
import { FirebaseProvider } from '@providers/firebase'
import { AlertsProvider } from '@providers/alerts';
import { DriverAuthProvider } from '@providers/api/driverAuth';

import { CONFIG } from '@providers/config'


@IonicPage()
@Component({
  selector: 'photos-vehicle',
  templateUrl: 'photos-vehicle.html'
})
export class PhotosVehiclesDriverPage {  
  noImg: string = './assets/imgs/no_photo.png'
  front: string = this.noImg
  rear: string = this.noImg
  Lrfron: string = this.noImg
  LrRear: string = this.noImg
  SoatFron: string = this.noImg
  SoatRear: string = this.noImg
  TecnoFron: string = this.noImg
  TecnoRear: string = this.noImg


  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: StorageDb,
    public media: MediaProvider,
    public alerts: AlertsProvider,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private fire: FirebaseProvider,
    public driveAuth: DriverAuthProvider) {
     

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

  ionViewDidLoad(){
    //this.getProfilePicture()
    this.getDriver()
  }

  // async getProfilePicture(){
  //   const loader = this.loadingCtrl.create({})
  //   loader.present()
  //   const userId = await this.getUserId()
  //   this.fire.getProfilePicture(userId).then(res =>{
  //     loader.dismiss()
  //     console.log(res)

  //     if(res['front'] !== undefined){
  //       this.front = res['front']
  //     }

  //     if(res['rear'] !== undefined){
  //       this.rear = res['rear']
  //     }

  //     if(res['Lrfron'] !== undefined){
  //       this.Lrfron = res['Lrfron']
  //     }

  //     if(res['LrRear'] !== undefined){
  //       this.LrRear = res['LrRear']
  //     }

  //     if(res['SoatFron'] !== undefined){
  //       this.SoatFron = res['SoatFron']
  //     }

  //     if(res['SoatRear'] !== undefined){
  //       this.SoatRear = res['SoatRear']
  //     }

  //     if(res['TecnoFron'] !== undefined){
  //       this.TecnoFron = res['TecnoFron']
  //     }

  //     if(res['TecnoRear'] !== undefined){
  //       this.TecnoRear = res['TecnoRear']
  //     }

  //   }).catch(e =>{
  //     loader.dismiss()
  //     console.error('error ' + e)
  //   })

  // }

  async getDriver() {
    this.driveAuth.getDriver().then(res => {
      const photo = res['data']['id_driver'].photoSoat
      console.log(photo, 'photo response')
      if (photo.front !== undefined) {
        this.front = photo.front
      }
      if (photo.rear !== undefined) {
        this.rear = photo.rear
      }

      if (photo.Lrfron !== undefined) {
        this.Lrfron = photo.Lrfron
      }

      if (photo.LrRear !== undefined) {
        this.LrRear = photo.LrRear
      }

      if (photo.SoatFron !== undefined) {
        this.SoatFron = photo.SoatFron
      }

      if (photo.SoatRear !== undefined) {
        this.SoatRear = photo.SoatRear
      }

      if (photo.TecnoFron !== undefined) {
        this.TecnoFron = photo.TecnoFron
      }

      if (photo.TecnoRear !== undefined) {
        this.TecnoRear = photo.TecnoRear
      }



    })
  }

  takePicture(modelPicture, mode){
    this.media.takePicture(mode).then(res =>{
      const modal = this.modalCtrl.create('ModalCropSharedComponent', { picture: res })
      modal.onDidDismiss(data =>{
        if(data){
        const photo = data.cropResult

        if(modelPicture === 'front'){
          this.front = photo
        }else if(modelPicture === 'rear'){
          this.rear = photo
        }else if(modelPicture === 'Lrfron'){
          this.Lrfron = photo
        }else if(modelPicture === 'LrRear'){
          this.LrRear = photo
        }else if(modelPicture === 'SoatFron'){
          this.SoatFron = photo
        }else if (modelPicture === 'SoatRear') {
          this.SoatRear = photo
        }else if (modelPicture === 'TecnoFron'){
          this.TecnoFron = photo
        }else if (modelPicture === 'TecnoRear') {
          this.TecnoRear = photo
          
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

    if(this.front != this.noImg){
      arrayImgs.push({
        model: this.front,
        id: userId,
        name: 'front'
      })
    }

    if(this.rear != this.noImg){
      arrayImgs.push({
        model: this.rear,
        id: userId,
        name: 'rear'
      })
    }

    if(this.Lrfron != this.noImg){
      arrayImgs.push({
        model: this.Lrfron,
        id: userId,
        name: 'Lrfron'
      })
    }

    if(this.LrRear != this.noImg){
      arrayImgs.push({
        model: this.LrRear,
        id: userId,
        name: 'LrRear'
      })
    }

    if(this.SoatFron != this.noImg){
      arrayImgs.push({
        model: this.SoatFron,
        id: userId,
        name: 'SoatFron'
      })
    }

    if(this.SoatRear != this.noImg){
      arrayImgs.push({
        model: this.SoatRear,
        id: userId,
        name: 'SoatRear'
      })
    }

    if(this.TecnoFron != this.noImg){
      arrayImgs.push({
        model: this.TecnoFron,
        id: userId,
        name: 'TecnoFron'
      })
    }

    if(this.TecnoRear != this.noImg){
      arrayImgs.push({
        model: this.TecnoRear,
        id: userId,
        name: 'TecnoRear'
      })
    }

    const indexArray = arrayImgs.length
    let dataArray = {
      front: null,
      rear: null,
      Lrfron: null,
      LrRear: null,
      SoatFron: null,
      SoatRear: null,
      TecnoFron:null,
      TecnoRear: null
    }

    arrayImgs.forEach((item, index) =>{

      this.fire.uploadPicture(item.model, item.id, item.name).then(res =>{
        console.log(res)

        if(item.model === this.front){
          dataArray.front = res
        }

        if(item.model === this.rear){
          dataArray.rear = res
        }

        if(item.model === this.Lrfron){
          dataArray.Lrfron = res
        }

        if(item.model === this.LrRear){
          dataArray.LrRear = res
        }

        if(item.model === this.SoatFron){
          dataArray.SoatFron = res
        }

        if (item.model === this.SoatRear) {
          dataArray.SoatRear = res
          
        }

        if (item.model === this.TecnoFron) {
          dataArray.TecnoFron = res
          
        }

        if (item.model === this.TecnoRear) {
          dataArray.TecnoRear = res
          
        }

        let myphoto = {
          photoSoat:{
            front: dataArray.front,
            rear: dataArray.rear,
            Lrfron: dataArray.Lrfron,
            LrRear: dataArray.LrRear,
            SoatFron: dataArray.SoatFron,
            SoatRear: dataArray.SoatRear,
            TecnoFron: dataArray.TecnoFron,
            TecnoRear: dataArray.TecnoRear
          }
        }

        console.log('dataArray ' , dataArray)

        

        if(index == indexArray -1){

          this.fire.saveImageProfilePath(dataArray, userId).then(res =>{
            this.driveAuth.saveUrl(myphoto).then(response => {
              console.log(response, 'response')
            })
            console.log('save image path ' + res)
          }).catch(e =>{
            console.error('error dont save image paht ' + e)
          })
          loader.dismiss()
          this.alerts.showAlert('', 'Se han guardado los datos correctamente')
        }
      }).catch(e =>{
        console.error('error upload ' + e)
        if(index == indexArray -1){
          loader.dismiss()
          this.alerts.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')
        }
      })

    })


}

}
