import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { FileOpener } from '@ionic-native/file-opener'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer'
import { File } from '@ionic-native/file'

import { FreightProvider } from '@providers/api/freight'
@IonicPage()
@Component({
  selector: 'progress-freight-driver',
  templateUrl: 'progress-freight.html'
})
export class ProgressFreightDriverPage {

  offer: any = []
  item: any
  fileTransfer: FileTransferObject

  id: string
  btnProgress: string = ''

  freight_state: number

  progress: any = [
    'Voy en Camino a Cargar',
    'Llegue a origen',
    'Iniciaron Cargue',
    'Conductor Cargado',
    'Voy en tránsito',
    'Llegue a mi destino',
    'Iniciaron descargue',
    'Terminaron descargue Tomar foto soporte',
    'Calificar empresa'
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
    private file: File
    ) {

    this.id = this.navParams.get('id')
    console.log(this.id)
    this.getOfferById(this.id)
    // this.getOfferById('5cd348882ce98522557052c7')

    this.fileTransfer = this.transfer.create()
  }

  getOfferById(id){
    this.freight.getOfferById(id).then(res =>{
      this.offer = res['data'].data
      this.freight_state = this.offer['state'].sequence
      console.log('STATE  ' + this.freight_state)
      console.log(JSON.stringify(this.offer))

      switch (this.freight_state) {
        case 4:
          this.btnProgress = this.progress[0]
        break;
        case 5:
          this.btnProgress = this.progress[1]
        break;
        default:
          this.btnProgress = this.progress[0]
          break;
      }
    })
  }

  changeState(){
    const state = this.freight_state + 1 + ''
    this.freight.updateOfferState(this.offer._id, state).then(res =>{
      console.log(JSON.stringify(res))
    })

  }

  openPDF(){
    if(this.offer.orden_cargue !== undefined && this.offer.orden_cargue !== null){

      const url = this.offer.orden_cargue
      const fileCargue = 'cargue.pdf'

      this.fileTransfer.download(url, this.file.dataDirectory + fileCargue).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.fileOpener.open(entry.toURL(), 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(e => console.error('Error opening file', e));
      }, (e) => {
        console.error(e)
      });
    }
  }

  getRequirements(state){
    if(state){
      return 'Si'
    }
    return 'No'
  }

}
