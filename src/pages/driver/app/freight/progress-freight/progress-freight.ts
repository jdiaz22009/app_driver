import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular'

import { Socket } from 'ng-socket-io'
import { Observable } from 'rxjs/Observable'

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
  photoCumplido: any = []
  fileTransfer: FileTransferObject

  id: string = ''
  btnProgress: string = ''

  freight_state: number

  enabledBtn: boolean = false

  authorId: string = ''
  miQualify: string = ''
  miComment: string = ''

  progress: any = [
    'Oferta Publicada',               //1
    'Vehículo Postulado',             //2
    'Vehículo Pre-seleccionado',      //3
    'Vehículo Aprobado',              //4
    'Vehículo Asignado',              //5
    'Asignación Aceptada',            //6
    'Orden de Cargue Recibida',       //7 'Orden de Cargue Enviada'
    'Anticipo Pre-Cargue Pagado',     //8 salto, si no tiene anticipo precargue
    'Vehículo en camino a cargar',    //9
    'Vehículo en origen',             //10
    'Vehículo Cargando',              //11
    'Vehículo Cargado',               //12 foto
    'Cargue Verificado',              //13
    'Anticipo Autorizado',            //14
    'Anticipo Pagado',                //15
    'Vehículo en tránsito',           //16
    'Vehículo en destino',            //17
    'Vehículo Descargando',           //18
    'Vehículo Descargado',            //19
    'Cumplido Enviado',               //20 foto del cumplido
    'Cumplido Aprobado',              //21
    'Saldo Aprobado',                 //22
    'Saldo Pagado',                   //23
    'Calificación Conductor',         //24
    'Calificación Empresa'            //25
  ]

  step_jump = [6, 7, 12, 13, 14, 20, 21, 22, 23, 25]

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
    {title: 'Elemento de Fumigación', model: 'RelementoFumigacion'}
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
    private file: File,
    private socket: Socket,
    public modalCtrl: ModalController,
    ) {

    this.id = this.navParams.get('id')
    console.log(this.id)
    this.getOfferById(this.id)
    this.fileTransfer = this.transfer.create()
  }

  ionViewDidLoad(){
    this.socket.connect()
    this.getOfferState().subscribe(state =>{
      console.log('socket subscribe ' + JSON.stringify(state))
      if(state){
        this.getOfferById(this.id)
      }
    })
  }

  getOfferState() {
    return new Observable(observer => {
      this.socket.on('offer_reload', (data) => {
        console.log(data)
        observer.next(data)
      })
    })
  }

  async getOfferLoadBackup(){
    const userId = await this.getUserId()
    const date = new Date().toLocaleString('en-GB', {"year":"2-digit","month":"2-digit","day":"2-digit","hour":"2-digit","minute":"2-digit"})
    this.fire.getOfferLoad(userId, this.offer._id).then(res =>{
      this.photoCargue = []
      this.photoCumplido = []
      const key = Object.keys(res)
      for(let i of key){
        if(i.includes('Cargue_')){
          this.photoCargue.push({img: res[i], date})
        }
        if(i.includes('Cumplido_')){
          this.photoCumplido.push({img: res[i], date})
        }
      }
    })
  }

  getOfferById(id){
    this.freight.getOfferById(id).then(res =>{
      this.offer = res['data'].data
      this.freight_state = this.offer['state'].sequence
      console.log(`STATE (${this.freight_state})`)
      console.log(JSON.stringify(this.offer), 'OFFERS')

      this.authorId = this.offer['author']._id
      this.setMyQualify()
      this.btnDisabledListener()
      this.getTxBtn()
      if(this.freight_state === 11 ||  this.freight_state === 19){
        this.getOfferLoadBackup()
      }

      // this.showModalQualify()
    })
  }

  async setMyQualify(){
    const userId = await this.getUserId();

    if(this.offer['asignados'] !== undefined && this.offer['asignados'].length > 0){

      for(let i of this.offer['asignados']){
        if(i['_id'] === userId){
          console.log('USER ID ' + i['_id'])
          for(let y of i['mis_calificaciones']) {
            console.log('Mis Calificaciones  ' + y)
            if(y['oferta'] === this.offer._id){
              console.log('OfferID ' + y['_id'])
              console.log('OfferID ' + JSON.stringify(y))
              this.miQualify = y['calificacion'];
              this.miComment = y['comentario']

            }
          }
        }
      }
    }
  }

  getTxBtn(){
    this.btnProgress = this.progress[this.freight_state]
  }

  getCurrentState(){
    return this.progress[this.freight_state -1]
  }

  btnDisabledListener(){
    console.log('btnListener ' + this.step_jump.indexOf(this.freight_state))
    if(this.step_jump.indexOf(this.freight_state) !== -1){
      this.enabledBtn = true
    }else{
      this.enabledBtn = false
    }

    if(this.freight_state === 25){
      this.showModalQualify()
    }
  }

  async getUserId() {
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
      return res.userId
    })
  }

  async changeState(){
    if(this.freight_state === 11){
      if(this.photoCargue.length > 0){
        this.freight.saveOfferLoad(this.offer._id, this.photoCargue).then(res =>{
          // console.log(JSON.stringify(res))
          if(res){
            const code = res['data'].code
            if(code === 100 && res['data']['data'].photo_cargue.length > 0){
              this.updateOffertState()
              this.alert.showAlert('Fotos enviadas', 'Las fotos del vehículo cargado se han enviado para su verificación.')
            }else{
              this.alert.showAlert('Error', 'Ha ocurrido un error interno, intenta de nuevo.')
            }
          }
        })
      }else{
        this.alert.showAlert('Error', 'Para continuar debes tomar una o más fotos del vehículo cargado.')
      }
    }else if(this.freight_state === 19){
      if(this.photoCumplido.length > 0){
          this.freight.saveOfferCumplido(this.offer._id, this.photoCumplido).then(res =>{
            if(res){
              const code = res['data'].code
              if(code === 100 && res['data']['data'].photo_cumplido.length > 0){
                this.updateOffertState()
                this.alert.showAlert('Fotos enviadas', 'Las fotos del cumplido se han enviado para su verificación.')
              }else{
                this.alert.showAlert('Error', 'Ha ocurrido un error interno, intenta de nuevo.')
              }
            }
          })
      }else{
        this.alert.showAlert('Error', 'Para continuar debes tomar una foto del cumplido.')
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
      this.socket.emit('steps', { channel: 'offer_reload'})
      this.socketUpdateStep(this.freight_state)
      this.getTxBtn()
      this.btnDisabledListener()
    })
  }

  openPDF(property, index){
    const loader = this.loadingCtrl.create({})
    loader.present()

    if(this.offer[property] !== undefined && this.offer[property] !== null){

      let url = this.offer[property]
      let fileCargue = ''

      if(property === 'orden_cargue'){
        fileCargue = 'cargue.pdf'
      }else if(property === 'orden_manifiesto'){
        fileCargue = 'manifiesto.pdf'
      }else if(property === 'orden_remesas'){
        const indexRemesa = this.offer[property].indexOf(index)
        fileCargue = `remesa_${indexRemesa}.pdf`
        url = index
        console.log('ulr ' + url + ' INDEX ' + fileCargue)
      }else if(property === 'other_documents'){
        const indexDocumentos = this.offer[property].indexOf(index)
        fileCargue = `documentos_${indexDocumentos}.pdf`
        url = index
      }

      this.fileTransfer.download(url, this.file.dataDirectory + fileCargue).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        loader.dismiss()
        this.fileOpener.open(entry.toURL(), 'application/pdf')
        .then(() =>{
          if(property === 'orden_cargue'){
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
          }
        })
        .catch(e => console.error('Error opening file', e))
      }, (e) => {
        console.error(e)
        loader.dismiss()
      })
    }
  }

  getRequirements(state){
    return state ? 'Si': 'No'
  }

  async takePicture(mode){
    const userId = await this.getUserId()
    this.media.takePicture(1).then(res =>{
      console.log(res)
      const img = res.toString().substring(23)
      const date = new Date().toLocaleString('en-GB', {"year":"2-digit","month":"2-digit","day":"2-digit","hour":"2-digit","minute":"2-digit"})
      let name
      if(mode === 'cargue'){
        name = 'Cargue_'+ new Date().getTime()
      }else if(mode === 'cumplido'){
        name = 'Cumplido_'+ new Date().getTime()
      }

      const loader = this.loadingCtrl.create({})
      loader.present()

      this.fire.uploadPicture(img, userId, name).then(url =>{

        if(mode === 'cargue'){
          this.photoCargue.push({
            img: url, date
          })
        }else if(mode === 'cumplido'){
          this.photoCumplido.push({
            img: url, date
          })
        }

        this.fire.saveOfferLoad(url, userId, this.offer._id, name).then(res =>{
          loader.dismiss()
        }).catch(e =>{
          console.error(e)
          loader.dismiss()
        })

      }).catch(e =>{
        console.error(e)
        loader.dismiss()
        this.alert.showAlert('Error', 'Error al subir fotos al servidor.')
      })
    }).catch(e =>{
      console.error(e)
    })
  }

  showModalQualify(){
    const modal = this.modalCtrl.create(
      'ModalQualifyDriverComponent',
      { offerId: this.offer._id, authorId: this.authorId },
      { cssClass: 'modal-lg' })

    modal.present()
  }

  socketUpdateStep(step){
    this.socket.emit('steps', {
      channel: 'sk-' + this.offer._id,
      pasos: step
    })
  }

}
