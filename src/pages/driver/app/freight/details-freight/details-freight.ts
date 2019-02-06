import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular'


import { FreightProvider } from '@providers/api/freight'

@IonicPage()
@Component({
  selector: 'details-freight-driver',
  templateUrl: 'details-freight.html'
})
export class DetailsFreightDriverPage {

  offer: any = []
  id: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public freight: FreightProvider,
    public navParams: NavParams) {


     this.id = this.navParams.get('id')

     //5c5b08f841aa84724f3698fc
    // this.getOfferById('5c5b08f841aa84724f3698fc')

     console.log(this.id)
     if(this.id != undefined){
        this.getOfferById(this.id)
     }else{
        this.offer = this.navParams.get('details')
     }
  }

  getOfferById(id){
    this.freight.getOfferById(id).then(res =>{
      this.offer = res['data'].data
    })
  }

  accept(){
    this.postulateToOffer()
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

  postulateToOffer(){
    this.freight.postulateToOffer(this.offer._id).then(res =>{
     const data = res['data']
     console.log(JSON.stringify(data))

     if(data){
       this.freight.updateOfferState(this.offer._id).then(res => console.log(JSON.stringify(res)))
      //  this.freight.pushToOffer().then(res => console.log(JSON.stringify(res)))
       this.showModalAccept()
     }
    }).catch(e =>{
     console.error(e)
    })

  }


}
