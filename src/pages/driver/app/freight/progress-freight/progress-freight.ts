import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'

import { FileOpener } from '@ionic-native/file-opener'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer'
import { File } from '@ionic-native/file'

import { AlertsProvider } from '@providers/alerts'
import { FirebaseProvider } from '@providers/firebase'
import { MediaProvider } from '@providers/media'
import { FreightProvider } from '@providers/api/freight'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'
@IonicPage()
@Component({
  selector: 'progress-freight-driver',
  templateUrl: 'progress-freight.html'
})
export class ProgressFreightDriverPage {

  offer: any = []
  item: any
  photoCargue: any = []
  fileTransfer: FileTransferObject

  id: string
  btnProgress: string = ''

  freight_state: number

  // enabledBtn: boolean = true
  enabledBtn: boolean = false

  // progress: any = [
  //   'Voy en Camino a Cargar',
  //   'Llegue a origen',
  //   'Iniciaron Cargue',
  //   'Conductor Cargado',
  //   'Voy en tránsito',
  //   'Llegue a mi destino',
  //   'Iniciaron descargue',
  //   'Terminaron descargue Tomar foto soporte',
  //   'Calificar empresa'
  // ]

  progress: any = [
    'Oferta Publicada',
    'Vehículo Postulado',
    'Vehículo Pre-seleccionado',
    'Vehículo Aprobado',
    'Vehículo Asignado',
    'Asiganción Aceptada',
    'Orden de Cargue Enviada',
    'Anticipo Pre-Cargue Pagado',
    'Vehículo en camino a cargar',
    'Vehículo en origen',
    'Vehículo Cargando',
    'Vehículo Cargado', //foto
    'Cargue Verificado',
    'Anticipo Autorizado',
    'Anticipo Pagado',
    'Vehículo en tránsito',
    'Vehículo en destino',
    'Vehículo Descargando',
    'Vehículo Descargado',
    'Cumplido Enviado',
    'Cumplido Aprobado',
    'Saldo Aprobado',
    'Saldo Pagado',
    'Calificación Conductor',
    'Calificación Empresa'
  ]

  requirementsOpt = [
    {title: 'ARP', model: 'Rarp'},
    {title: 'Salud', model: 'Rsalud'},
    {title: 'Pensión', model: 'Rpension'},
    {title: 'GPS', model: 'Rgps'},
    {title: 'Trabajo en Alturas', model: 'RtrabajoAltura'},
    {title: 'Manejo de Alimentos', model: 'RmanejoAlimentos'},
    {title: 'Certificado de Fumigación', model: 'RcertificadoFumigacion'},
    {title: 'Sustancias Peligrosas', model: 'RsustanciaPeligrosa'},
    {title: 'Kit de Derrames', model: 'RkitDerrames'},
    {title: 'Elemento de Fumigación', model: 'RelementoFumigacion'},
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public freight: FreightProvider,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public media: MediaProvider,
    public fire: FirebaseProvider,
    public alert: AlertsProvider,
    public db: StorageDb,
    private file: File
    ) {

    this.id = this.navParams.get('id')
    console.log(this.id)
    this.getOfferById(this.id)
    // this.getOfferById('5cd348882ce98522557052c7')
    this.fileTransfer = this.transfer.create()
  }

  async getOfferLoadBackup(){
    const userId = await this.getUserId()
    const date = new Date().toLocaleString('en-GB', {"year":"2-digit","month":"2-digit","day":"2-digit","hour":"2-digit","minute":"2-digit"})
    this.fire.getOfferLoad(userId, this.offer._id).then(res =>{
      const key = Object.keys(res)
      for(let i of key){
        if(i.includes('Cargue_')){
          this.photoCargue.push({img: res[i], date})
        }
      }
    })
  }

  getOfferById(id){
    this.freight.getOfferById(id).then(res =>{
      this.offer = res['data'].data
      this.freight_state = this.offer['state'].sequence
      console.log(`STATE (${this.freight_state})`)
      // console.log(JSON.stringify(this.offer))

      // if(this.freight_state > 7 && this.offer.is_orden_cargue){
      //   this.enabledBtn = true
      // }

      this.btnProgress = this.progress[this.freight_state - 1]
      if(this.freight_state === 12){
        this.getOfferLoadBackup()
      }

    })
  }

  async getUserId() {
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
      return res.userId
    })
  }

  async changeState(){
    if(this.freight_state === 12){
      if(this.photoCargue.length > 0){
        this.freight.saveOfferLoad(this.offer._id, this.photoCargue).then(res =>{
          // console.log(JSON.stringify(res))
          if(res){
            const code = res['data'].code
            if(code === 100 && res['data']['data'].photo_cargue.length > 0){
              this.updateOffertState()
            }else{
              this.alert.showAlert('Error', 'Ha ocurrido un error interno, intenta de nuevo.')
            }
          }
        })
      }else{
        this.alert.showAlert('Error', 'Para continuar debes tomar una o más fotos del vehículo cargado.')
      }
    }else{
      this.updateOffertState()
    }
  }

  updateOffertState(){
    const state = this.freight_state + 1 + ''
    this.freight.updateOfferState(this.offer._id, state).then(res =>{
      this.offer = res['data'].data
      this.freight_state = this.offer['state'].sequence
      console.log(`STATE (${this.freight_state})`)
      this.btnProgress = this.progress[this.freight_state - 1]
    })
  }

  openPDF(){
    const loader = this.loadingCtrl.create({})
    loader.present()
    if(this.offer.orden_cargue !== undefined && this.offer.orden_cargue !== null){

      const url = this.offer.orden_cargue
      const fileCargue = 'cargue.pdf'

      this.fileTransfer.download(url, this.file.dataDirectory + fileCargue).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        loader.dismiss()
        this.fileOpener.open(entry.toURL(), 'application/pdf')
        .then(() =>{
          this.freight.updateOfferOrdenCargue(this.offer._id).then(res =>{
            if(res){
              console.log(JSON.stringify(res))
              const code = res['data'].code
              if(code === 100){
                this.getOfferById(this.id)
              }
            }
          }).catch(e =>{
            console.error('Cargue Error ' + e)
          })
        })
        .catch(e => console.error('Error opening file', e));
      }, (e) => {
        console.error(e)
        loader.dismiss()
      })
    }
  }

  getRequirements(state){
    if(state){
      return 'Si'
    }
    return 'No'
  }

  async takeCarguePicture(){
    const userId = await this.getUserId()
    this.media.takePicture(1).then(res =>{
      console.log(res)
      const img = res.toString().substring(23)
      const date = new Date().toLocaleString('en-GB', {"year":"2-digit","month":"2-digit","day":"2-digit","hour":"2-digit","minute":"2-digit"})
      const name = 'Cargue_'+ new Date().getTime()

      const loader = this.loadingCtrl.create({})
      loader.present()

      this.fire.uploadPicture(img, userId, name).then(url =>{

        this.photoCargue.push({
          img: url, date
        })

        this.fire.saveOfferLoad(url, userId, this.offer._id, name).then(res =>{
          loader.dismiss()
        }).catch(e =>{
          console.error(e)
          loader.dismiss()
        })

      }).catch(e =>{
        console.log(e)
        loader.dismiss()
        this.alert.showAlert('Error', 'Error al subir fotos al servidor.')
      })
    }).catch(e =>{
      console.error(e)
    })
  }

}
