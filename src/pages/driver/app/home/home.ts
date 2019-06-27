import { Component } from '@angular/core'
import { IonicPage, NavController, ModalController, Platform } from 'ionic-angular'

import { Socket } from 'ng-socket-io'
import { Observable } from 'rxjs/Observable'

import { AppVersion } from '@ionic-native/app-version'
import { Badge } from '@ionic-native/badge'
import { SocialSharing } from '@ionic-native/social-sharing'

import { AlertsProvider } from '@providers/alerts'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { CartProvider } from '@providers/api/cart'
import { CONFIG } from '@providers/config'

@IonicPage({
  name: 'home-drive',
  segment: 'home-drive'
})
@Component({
  selector: 'home-driver',
  templateUrl: 'home.html'
})
export class HomeDriverPage {

  version: string = ''
  offerCount: number = 0
  pendingCount: number = 0

  cantOpenFind: boolean = false

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public auth: DriverAuthProvider,
    public plt: Platform,
    public alerts: AlertsProvider,
    public cart: CartProvider,
    private appVersion: AppVersion,
    private socket: Socket,
    private badge: Badge,
    private socialSharing: SocialSharing
  ) {

  }

  ionViewDidLoad(){
    this.getAppVersion()

    this.socket.connect()

    this.observateNewOffers().subscribe(state =>{
      console.log(state)
      if(state){
        this.getOfferCount()
      }
    })
  }

  ionViewDidEnter() {
    this.getOfferCount()
    this.getVehicles()
  }

  observateNewOffers() {
    return new Observable(observer => {
      this.socket.on('new_publish', (data) => {
        console.log(data)
        observer.next(data)
      })
    })
  }

  getOfferCount(){
    this.auth.getOfferCount().then(res =>{
      // console.log('getOfferCount ' + res)
      if(res){
        this.offerCount = res['data'].disponibles
        this.setBadge(this.offerCount)
      }
    })
  }

  getVehicles(){
    this.cart.getVehiclesList().then(res =>{
      const vehicles = res['data']['data']
      if(vehicles.length > 0){
        this.cantOpenFind = true
      }
    })
  }

  getAppVersion(){
    if(this.plt.is('cordova')){
      this.appVersion.getVersionNumber().then(res =>{
        this.version = res
      })
    }
  }

  goPage(page) {
    if(page === 'FindFreightDriverPage' && !this.cantOpenFind){
      this.alerts.showAlert('Error', 'No tienes vehículos, debes crear al menos uno y activarlo para buscar cargas.')
      return
    }
    this.navCtrl.push(page)
  }

  getComingSoonFletes() {
    const modal = this.modalCtrl.create('ModalComingSoonComponent', null, { cssClass: 'modal-id' })
    modal.present()
    const paramas = {
      request: 'FLETES'
    }
    this.auth.ComingSoon(paramas).then(res => {
      console.log('--Home getComingSoonFletes-- res: ', res)
    }).catch(e => {
      console.error('--Home getComingSoonFletes-- error: ', e)
    })
  }

  getComingSoonDisponibilidad() {
    const modal = this.modalCtrl.create('ModalComingSoonComponent', null, { cssClass: 'modal-id' })
    modal.present()
    const paramas = {
      request: 'DISPONIBILIDAD'
    }
    this.auth.ComingSoon(paramas).then(res => {
      console.log('--Home getComingSoonFletes-- res: ', res)
    }).catch(e => {
      console.error('--Home getComingSoonFletes-- error: ', e)
    })
  }

  getComingSoonCargas() {
    const modal = this.modalCtrl.create('ModalComingSoonComponent', null, { cssClass: 'modal-id' })
    modal.present()
    const paramas = {
      request: 'CARGAS'
    }
    this.auth.ComingSoon(paramas).then(res => {
      console.log('--Home getComingSoonFletes-- res: ', res)
    }).catch(e => {
      console.error('--Home getComingSoonFletes-- error: ', e)

    })
  }

  availability() {
    const modal = this.modalCtrl.create('AvailabilityDriverPage', null, { cssClass: 'modal-availability' })
    modal.present()
  }

  async setBadge(num){
    try{
      const io = await this.badge.isSupported()
      console.log('badge support ' + io)
      this.badge.set(num)
    }catch(e){
      console.error(e)
    }
  }

  async getSupport(){
    let msg = 'hola, soy '
    const profile = await this.getDriverProfile()
    if(profile){
      const user = profile['data'].id_driver
      const vehicleSelected = user.vehiculos.map(item =>{
        if(item['select'] && item['state']) return item
      })
      const name = this.validateProperty(user.primer_nombre ) ?  user.primer_nombre.toUpperCase() : ''
      const last_name = this.validateProperty(user.primer_apellido) ? user.primer_apellido.toUpperCase() : ''
      const vehicle_class = this.validateProperty(vehicleSelected[0]['clase_vehiculo']) ? vehicleSelected[0]['clase_vehiculo'].toUpperCase() : ''
      const vehicle_plate =  this.validateProperty(vehicleSelected[0]['placa']) ? vehicleSelected[0]['placa'].toUpperCase() : ''
      msg = `Hola, soy ${name} ${last_name} con tipo de vehículo ${vehicle_class}, placa número ${vehicle_plate} y cédula ${user.documento}, por favor necesito soporte.`
    }

    this.socialSharing.shareViaWhatsAppToReceiver(
      CONFIG.support.whatsapp,
      msg
    )
  }

  async getDriverProfile(){
    return await this.auth.getDriver()
  }

  validateProperty(property){
    if(property !== undefined && property !== null && property !== ''){
      return true
    }
    return false
  }

}
