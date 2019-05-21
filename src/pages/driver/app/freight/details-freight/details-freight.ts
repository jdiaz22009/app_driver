import { AlertsProvider } from '@providers/alerts';
import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular'

import { SocialSharing } from '@ionic-native/social-sharing'

import { FreightProvider } from '@providers/api/freight'

@IonicPage()
@Component({
  selector: 'details-freight-driver',
  templateUrl: 'details-freight.html'
})
export class DetailsFreightDriverPage {

  offer: any = []
  id: string
  mode: number
  author_id: string

  requirementsOpt = [
    {title: 'ARL', model: 'Rarp'},
    {title: 'Salud', model: 'Rsalud'},
    {title: 'Pensión', model: 'Rpension'},
    {title: 'GPS', model: 'Rgps'},
    {title: 'Trabajo en Alturas', model: 'RtrabajoAltura'},
    {title: 'Manejo de Alimentos', model: 'RmanejoAlimentos'},
    {title: 'Certificado de Fumigación', model: 'RcertificadoFumigacion'},
    {title: 'Sustancias Peligrosas', model: 'RsustanciaPeligrosa'},
    {title: 'Kit de Derrames', model: 'RkitDerrames'},
    {title: 'Elementos de protección Personal', model: 'RelementoFumigacion'},
  ]

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public freight: FreightProvider,
    public navParams: NavParams,
    public alerts: AlertsProvider,
    private socialSharing: SocialSharing) {

     this.mode = this.navParams.get('mode')
     this.id = this.navParams.get('id')
     console.log('offer ID ' + this.id)

  }

  ionViewDidLoad(){
    setTimeout(() =>{
      this.getOfferById(this.id)
    }, 500)
  }

  getOfferById(id){
    this.freight.getOfferById(id).then(res =>{
      if(res){
        console.log(JSON.stringify(res))
        this.offer = res['data'].data
        this.author_id = this.offer['author']._id
        // console.log(JSON.stringify(this.offer))
      }
    })
  }

  accept(){
    this.freight.postulateToOffer(this.offer._id).then(res =>{
      const data = res['data']
      console.log(JSON.stringify(res))
      if(data['code'] !== undefined && data['code'] !== 100){
        this.alerts.showAlert('Error', data['message'])
        return
      }

      if(data['code'] === 100){
        if(data){
          this.freight.pushToOffer(this.author_id, this.offer._id).then(res => console.log(JSON.stringify(res)))
          this.showModalAccept()
        }
      }


     }).catch(e =>{
      console.error(e)
     })
  }

  showModalAccept(){
    const modal = this.modalCtrl.create('ModalPostulationDriverComponent', null, { cssClass: 'modal-id' })
    modal.onDidDismiss((data) =>{
      if(data['mode'] === 'find'){
        this.navCtrl.popTo('FindFreightDriverPage')
      }else if(data['mode'] === 'home'){
        this.navCtrl.setRoot('home-drive')
      }
    })
    modal.present()
  }

  shared(freight){
    // console.log(freight)

    const message = `No DE PEDIDO: ${freight.pedido}. Ruta: ${freight.ciudad_origen.toUpperCase()}-${freight.ciudad_destino.toUpperCase()}. Vehículo: ${freight.clase_vehiculo.toUpperCase()}-${freight.tipo_carroceria.toUpperCase()}. Peso: ${freight.peso_carga_max} TON. CONTACTO: ${freight.coordinador.primer_nombre.toUpperCase()} ${freight.coordinador.primer_apellido.toUpperCase()}, ${freight.coordinador.celular}, Si quieres pago contra entrega, pregunta por PagaYa!!! http://tiny.cc/u09z5y`

    const subject  = 'Carga Disponible, postulate'
    const file = null
    const url = null

    this.socialSharing.share(message, subject, file, url)
  }

  getRequirements(state){
    if(state){
      return 'Si'
    }
    return 'No'
  }

  getCurrency(value){
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return formatter.format(value).replace(/\D00$/, '')
  }

  getTime = (time) => {
    const d = new Date(time)
    return d.toLocaleDateString('en-GB')
  }

}
