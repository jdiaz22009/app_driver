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

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public freight: FreightProvider,
    public navParams: NavParams,
    private socialSharing: SocialSharing) {

     this.mode = this.navParams.get('mode') 
     this.id = this.navParams.get('id')
     this.getOfferById(this.id)
  }

  getOfferById(id){
    this.freight.getOfferById(id).then(res =>{
      this.offer = res['data'].data
      console.log(JSON.stringify(this.offer))
      this.author_id = this.offer['author']._id
    })
  }

  accept(){
    this.freight.postulateToOffer(this.offer._id).then(res =>{
      const data = res['data']
      console.log(JSON.stringify(data)) 
      if(data){       
        this.freight.pushToOffer(this.author_id, this.offer._id).then(res => console.log(JSON.stringify(res)))
        this.showModalAccept()
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
    
    // console.log(JSON.stringify(freight))        
    const initDate = new Date(freight.inicio).toLocaleDateString()        
    const message = `Oferta CargaYa 
                      Detalle: ${freight.Robservaciones} 
                      Flete: ${freight.flete} , 
                      Fecha de inicio: ${initDate}, 
                      Origen: ${freight.ciudad_origen} ,
                      Desitno: ${freight.ciudad_destino} ,  
                      ID: ${freight._id} 
                      Ingresa a nuestra app y postúlate` 
    // const message = `Oferta CargaYa Detalle: ${freight.Robservaciones} Flete: $${freight.flete}, Fecha de inicio: ${initDate}, Origen: ${freight.ciudad_origen}, Desitno: ${freight.ciudad_destino}, ID: ${freight._id}, Ingresa a nuestra app y postúlate` 

    const subject  = 'Carga Disponible, postulate'
    const file = null
    const url = null

    this.socialSharing.share(message, subject, file, url)
  }


}
