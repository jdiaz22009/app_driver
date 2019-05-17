import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { AlertsProvider } from '@providers/alerts'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'
import { FreightProvider } from '@providers/api/freight'

@IonicPage()
@Component({
  selector: 'my-freight-driver',
  templateUrl: 'my-freight.html'
})
export class MyFreightDriverPage {

  allOffers: any = []
  assignedOffers: any = []
  historyOffers: any = []

  listType: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: StorageDb,
    public offer: FreightProvider,
    public alerts: AlertsProvider,
    public driverAuth: DriverAuthProvider
    ) {


  }

  ionViewDidLoad(){
    this.listType = 'all'
    this.getMyOffers()
  }

  async getUserId(){
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
       return res.userId
    })
   }

  async getMyOffers(){

    this.allOffers = []
    this.assignedOffers = []
    this.historyOffers = []

    const userId = await this.getUserId()
    this.offer.getDriverMyOffers().then(res =>{
      const data = res['data']['data']
      console.log(JSON.stringify(data))
      if(data.length > 0){

        let showAlert = true

        let opt = [
          { key: 'postulantes' , state: 'Postulado'},
          { key: 'pre_selected' , state: 'Pre-seleccionado'},
          { key: 'aprobados' , state: 'Aprobado'},
          { key: 'asignados' , state: 'Asignado'}
        ]

        for(let i of data){

            opt.map(y =>{
              if(i[y.key] !== undefined && i[y.key] !== null && i[y.key].length > 0){
                for(let o of i[y.key]){
                  if(o._id === userId){
                    i['estado_flete'] = y.state
                  }
                }
              }
            })

            if(i['driverselected'] !== undefined
              && i['driverselected'] !== null
              && i['driverselected'].length > 0 ){

                for(let y of i['driverselected']){
                  if(y._id === userId){
                    this.assignedOffers.push(i)
                  }else{
                    if(i['estado_flete'] === 'Asignado' && showAlert){
                      showAlert = false
                      this.alerts.showAlert('Felicitaciones', 'Has sido seleccionado para un viaje, solo tienes que aceptarlo para comenzar tu viaje')
                    }
                    this.allOffers.push(i)
                  }
                }

            }else{
              this.allOffers.push(i)
              if(i['estado_flete'] === 'Asignado' && showAlert){
                showAlert = false
                this.alerts.showAlert('Felicitaciones', 'Has sido seleccionado para un viaje, solo tienes que aceptarlo para comenzar tu viaje')
              }
            }

        }
     }
    })
  }

  freightDetails(freight){
    this.navCtrl.push('DetailsFreightDriverPage', { id: freight._id, mode: 1})
  }

  freight(freight){
    this.navCtrl.push('ProgressFreightDriverPage', { id: freight._id})
  }

  acceptOffer(id){
    console.log('accept offer ' + id)
    this.driverAuth.acceptTheOffer(id).then(res =>{
      console.log(JSON.stringify(res))
      if(res){
        this.alerts.showAlert('Oferta Aceptada', 'En viajes en curso encontrarás más información')
        this.getMyOffers()
      }

    }).catch(e =>{
      console.error(e)
      this.alerts.showAlert('Error', 'Ocurrió un error al aceptar la oferta')
    })
  }

}
