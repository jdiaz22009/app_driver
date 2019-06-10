import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { Socket } from 'ng-socket-io'
import { Observable } from 'rxjs/Observable'

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
    public driverAuth: DriverAuthProvider,
    private socket: Socket
    ) {


  }

  ionViewDidLoad(){
    this.listType = 'all'
    this.getMyOffers()

    this.getOfferState().subscribe(state =>{
      if(state){
        this.getMyOffers()
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

  async getUserId(){
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
       return res.userId
    })
   }

  async getMyOffers(){

    const userId = await this.getUserId()
    this.offer.getDriverMyOffers().then(res =>{
      const data = res['data']['data']
      console.log(JSON.stringify(data))
      if(data.length > 0){

        this.allOffers = []
        this.assignedOffers = []
        this.historyOffers = []

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
                      const msd = `${i['coordinador'].primer_nombre} de ${i['coordinador']['entidad'].razon} te ha asignado para un viaje de ${i.ciudad_origen} a ${i.ciudad_destino}, ¿Aún deseas tomarlo?`
                      this.alerts.showConfirm('Felicitaciones!!!', msd , 'Aceptar', 'Cancelar' ).then(res =>{
                        if(res === 1){
                          this.acceptOffer(i._id)
                        }
                      })
                    }
                    this.allOffers.push(i)
                  }
                }

            }else{
              this.allOffers.push(i)
              if(i['estado_flete'] === 'Asignado' && showAlert){
                showAlert = false
                const msd = `${i['coordinador'].primer_nombre} de ${i['coordinador']['entidad'].razon} te ha asignado para un viaje de ${i.ciudad_origen} a ${i.ciudad_destino}, ¿Aún deseas tomarlo?`
                this.alerts.showConfirm('Felicitaciones!!!', msd , 'Aceptar', 'Cancelar' ).then(res =>{
                  if(res === 1){
                    this.acceptOffer(i._id)
                  }
                })
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
      // console.log(JSON.stringify(res))
      if(res){
        this.alerts.showAlert('Oferta Aceptada', 'En viajes en curso encontrarás más información')
        this.socket.emit('steps', { channel: 'offer_reload'})
        this.getMyOffers()
      }

    }).catch(e =>{
      console.error(e)
      this.alerts.showAlert('Error', 'Ocurrió un error al aceptar la oferta')
    })
  }

  cancerlOffer(id){
    console.log('cancelar offer ' + id)
    // this.driverAuth.cancelTheOffer(id).then(res =>{
    //   console.log(JSON.stringify(res))
    //   if(res){
    //     this.alerts.showAlert('Oferta Rechazada', 'Haz rechazado la oferta.')
    //     this.getMyOffers()
    //     this.allOffers = []
    //   }
    // }).catch(e =>{
    //   console.error(e)
    //   this.alerts.showAlert('Error', 'Ocurrió un error al aceptar la oferta')
    // })
  }

}
