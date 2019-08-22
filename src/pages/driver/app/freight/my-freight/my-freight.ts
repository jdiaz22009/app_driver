import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { Socket } from 'ng-socket-io'
import { Observable } from 'rxjs/Observable'

import _ from 'lodash'

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

  showAlert: boolean = true

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

  ionViewDidLoad() {
    this.listType = 'all'
    this.getMyOffers()

    this.getOfferState().subscribe(state => {
      if (state) {
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

  async getUserId() {
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
      return res.userId
    })
  }

  validateArray(data){
    return (data !== undefined && data !== null && Array.isArray(data) && data.length > 0)
  }

  validateOffer(i){
    if (i['estado_flete'] === 'Asignado' && this.showAlert) {
      this.showAlert = false
      const msd = `${i['coordinador'].primer_nombre} de ${i['coordinador']['entidad'].razon} te ha asignado para un viaje de ${i.ciudad_origen} a ${i.ciudad_destino}, ¿Aún deseas tomarlo?`
      this.alerts.showConfirm('Felicitaciones!!!', msd, 'Aceptar', 'Cancelar').then(res => {
        if (res === 1) {
          this.acceptOffer(i._id)
        }
      })
    }
  }

  async getMyOffers() {

    const userId = await this.getUserId()

    const myOffers = await this.offer.getDriverMyOffers()

    if(myOffers){

      const data = myOffers['data']['data']
      console.log(JSON.stringify(data))

      if (this.validateArray(data)) {

        this.allOffers = []
        this.assignedOffers = []
        this.historyOffers = []

        let opt = [
          { key: 'postulantes', state: 'Postulado' },
          { key: 'pre_selected', state: 'Pre-seleccionado' },
          { key: 'aprobados', state: 'Aprobado' },
          { key: 'asignados', state: 'Asignado' }
        ]

        for (let i of data) {

          opt.map(y => {
            if(this.validateArray(i[y.key])){
              for (let o of i[y.key]) {
                if (o._id === userId) {
                  i['estado_flete'] = y.state
                }
              }
            }
          })

          let addToArray = true


          if(this.validateArray(i['driverselected'])){

            if (i['driverselected'][0] !== undefined && i['driverselected'][0]._id === userId) {
              if(i['state'].sequence === 99){
                if(addToArray){
                  addToArray = false
                  this.historyOffers.push(i)
                }
              }else{
                if(addToArray){
                  addToArray = false
                  this.assignedOffers.push(i)
                }
              }
            }

          }else if(this.validateArray(i['asignados'])){

            if (i['asignados'][0] !== undefined && i['asignados'][0]._id === userId) {
              if(i['state'].sequence > 5){
                if(addToArray){
                  addToArray = false
                  this.assignedOffers.push(i)
                }
              }else{
                if(addToArray){
                  addToArray = false
                  this.allOffers.push(i)
                }
              }

              this.validateOffer(i)
            }

          }else if(this.validateArray(i['postulantes'])){

              const isMyUser = i['postulantes'].find(item =>{
                return item._id === userId
              })
              // console.log('myUser ' + JSON.stringify(isMyUser) + ' ' + typeof(isMyUser))

              if(isMyUser !== undefined && isMyUser !== null && typeof(isMyUser) === 'object'){
                if(addToArray){
                  addToArray = false
                  this.allOffers.push(i)
                }
              }
          }



          // if(this.validateArray(i['driverselected'])){ // only a driver

          //   for (let y of i['driverselected']) {

          //       if (y._id === userId) {

          //         if(i['state'].sequence === 99){
          //           this.historyOffers.push(i)
          //         }else{
          //           this.assignedOffers.push(i)
          //         }

          //         if (i['estado_flete'] === 'Asignado' && this.showAlert) {
          //          this.showAlert = false
          //          const msd = `${i['coordinador'].primer_nombre} de ${i['coordinador']['entidad'].razon} te ha asignado para un viaje de ${i.ciudad_origen} a ${i.ciudad_destino}, ¿Aún deseas tomarlo?`
          //          this.alerts.showConfirm('Felicitaciones!!!', msd, 'Aceptar', 'Cancelar').then(res => {
          //            if (res === 1) {
          //              this.acceptOffer(i._id)
          //            }
          //          })
          //         }

          //       }



          //     // if(i['state'].sequence === 99){
          //     //   this.historyOffers.push(i)
          //     // }else{
          //     //   if (y._id === userId) {
          //     //     this.assignedOffers.push(i)
          //     //     // assign.push(i)
          //     //     // this.assignedOffers = assign.reverse()
          //     //     // console.log(JSON.stringify(this.assignedOffers),'assing')

          //     //  } else {
          //     //    if (i['estado_flete'] === 'Asignado' && showAlert) {
          //     //      showAlert = false
          //     //      const msd = `${i['coordinador'].primer_nombre} de ${i['coordinador']['entidad'].razon} te ha asignado para un viaje de ${i.ciudad_origen} a ${i.ciudad_destino}, ¿Aún deseas tomarlo?`
          //     //      this.alerts.showConfirm('Felicitaciones!!!', msd, 'Aceptar', 'Cancelar').then(res => {
          //     //        if (res === 1) {
          //     //          this.acceptOffer(i._id)
          //     //        }
          //     //      })
          //     //    }
          //     //   //  this.allOffers.push(i).reverse()
          //     //   this.allOffers.push(i)
          //     //  }
          //     // }

          //   }

          // } else {

          //   if(this.validateArray(i['postulantes']) ){

          //     const isMyUser = i['postulantes'].find(item =>{
          //       return item._id === userId
          //     })
          //     // console.log('myUser ' + JSON.stringify(isMyUser) + ' ' + typeof(isMyUser))

          //     if(isMyUser !== undefined && isMyUser !== null && typeof(isMyUser) === 'object'){
          //       this.allOffers.push(i)
          //       this.validateOffer(i)
          //     }

          //   }
          // }
        }

        // this.allOffers = _.uniq(_.map(this.allOffers, '_id'))
        // this.assignedOffers = _.uniq(_.map(this.assignedOffers, '_id'))
        // this.historyOffers = _.uniq(_.map(this.historyOffers, '_id'))

        this.allOffers.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
        this.assignedOffers.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
        this.historyOffers.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())

      }

    }

  }

  freightDetails(freight) {
    this.navCtrl.push('DetailsFreightDriverPage', { id: freight._id, mode: 1 })
  }

  freightHistoryDetails(freight){
    this.navCtrl.push('HistoryFreightDriverPage', { id: freight._id })
  }

  freight(freight) {
    this.navCtrl.push('ProgressFreightDriverPage', { id: freight._id })
  }

  acceptOffer(id) {
    console.log('accept offer ' + id)
    this.driverAuth.acceptTheOffer(id).then(res => {
      // console.log(JSON.stringify(res))
      if (res) {
        this.alerts.showAlert('Oferta Aceptada', 'En viajes en curso encontrarás más información')
        this.socket.emit('steps', { channel: 'offer_reload' })
        this.getMyOffers()
      }

    }).catch(e => {
      console.error(e)
      this.alerts.showAlert('Error', 'Ocurrió un error al aceptar la oferta')
    })
  }

  cancerlOffer(id) {
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
