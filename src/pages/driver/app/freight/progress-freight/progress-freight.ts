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
    console.log(state)

    this.freight.updateOfferState(this.offer._id, state).then(res =>{
      console.log(res)
      console.log(JSON.stringify(res))
    })

  }

  openPDF(){
    if(this.offer.orden_cargue !== undefined && this.offer.orden_cargue !== null){

      const url = this.offer.orden_cargue
      const fileCargue = 'cargue.pdf'
      console.log('openPDF')

      this.fileTransfer.download(url, this.file.dataDirectory + fileCargue).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.fileOpener.open(entry.toURL(), 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(e => console.error('Error opening file', e));
      }, (e) => {
        console.error(e)
      });

      // this.file.checkFile(this.file.dataDirectory, fileCargue).then(res =>{
      //   console.log('checkFile ' + res)
      //   if(res){
      //     console.log('open file')
      //     this.fileOpener.open(this.file.dataDirectory + fileCargue, 'application/pdf')
      //       .then(() => console.log('File is opened'))
      //       .catch(e => console.error('Error opening file', e));

      //   }else{
      //     console.log('download file')
      //     this.fileTransfer.download(url, this.file.dataDirectory + fileCargue).then((entry) => {
      //       console.log('download complete: ' + entry.toURL());
      //       this.fileOpener.open(entry.toURL(), 'application/pdf')
      //       .then(() => console.log('File is opened'))
      //       .catch(e => console.error('Error opening file', e));
      //     }, (e) => {
      //       console.error(e)
      //     });
      //   }
      // })

    }
  }

}
