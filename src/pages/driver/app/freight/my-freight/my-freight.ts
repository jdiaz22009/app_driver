import { AlertsProvider } from '@providers/alerts';
import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

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
    const id = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
       return res.userId
     })
     return id
   }

  async getMyOffers(){

    const userId = await this.getUserId()
    this.offer.getDriverMyOffers().then(res =>{
      console.log(JSON.stringify(res))
      const data = res['data']['data']

      if(data.length > 0){
        let showAlert = true

        for(let i of data){


          //postulado
          //preseleccionado
          //aprobado
          //asignado

          // if(i['postulantes'] !== undefined
          // && i['postulantes'] !== null
          //   && i['postulantes'].length > 0){

          //     for(let y of i['postulantes']){
          //       if(y._id === userId){
          //         i['estado_flete'] = 'postulado'
          //       }
          //     }
          // }

          // if(i['pre_selected'] !== undefined
          // && i['pre_selected'] !== null
          //   && i['pre_selected'].length > 0){

          //     for(let y of i['pre_selected']){
          //       if(y._id === userId){
          //         i['estado_flete'] = 'Pre-seleccionado'
          //       }
          //     }
          // }

          // if(i['aprobados'] !== undefined
          // && i['aprobados'] !== null
          //   && i['aprobados'].length > 0){

          //     for(let y of i['aprobados']){
          //       if(y._id === userId){
          //         i['estado_flete'] = 'Aprobado'
          //       }
          //     }
          // }

          if(i['asignados'] !== undefined
          && i['asignados'] !== null
            && i['asignados'].length > 0){

              for(let y of i['asignados']){
                if(y === userId){
                  i['estado_flete'] = 'asignado'
                  if(showAlert){
                    showAlert = false
                    this.alerts.showAlert('Felicitaciones', 'Has sido seleccionado para un viaje, solo tienes que aceptarlo para comenzar tu viaje')
                  }
                }
              }
          }

          if(i['driverselected'] !== undefined
            && i['driverselected'] !== null
            && i['driverselected'].length > 0 ){

              for(let y of i['driverselected']){
                if(y._id === userId){
                  this.assignedOffers.push(i)
                }else{
                  this.allOffers.push(i)
                }
              }

          }else{
            this.allOffers.push(i)
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
