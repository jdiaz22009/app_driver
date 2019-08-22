import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular'

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
  selector: 'history-freight-driver',
  templateUrl: 'history-freight.html'
})
export class HistoryFreightDriverPage {

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
    public modalCtrl: ModalController,
    ) {

    this.id = this.navParams.get('id')
    console.log(this.id)
    this.getOfferById(this.id)
    this.fileTransfer = this.transfer.create()
  }

  ionViewDidLoad(){

  }


  async getOfferLoadBackup(){
    const userId = await this.getUserId()
    const date = new Date().toLocaleString('en-GB', {"year":"2-digit","month":"2-digit","day":"2-digit","hour":"2-digit","minute":"2-digit"})
    this.fire.getOfferLoad(userId, this.offer._id).then(res =>{
      console.log('offer images ' + res)
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

      this.getOfferLoadBackup()


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

  async getUserId() {
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
      return res.userId
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

}
