import { Component, Input } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '@providers/alerts'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { StorageDb } from '@providers/storageDb'
import { CartProvider } from '@providers/api/cart'

@Component({
  selector: 'nav-driver-component',
  templateUrl: 'nav.html'
})
export class NavDriverComponent {

  @Input('title') navTitle

  tx_available: string = ''
  plate: string = ''
  vehicle_id: string = ''

  modeTitle: boolean = false
  driver_available: boolean = false
  nav_ava: boolean = false

  constructor(
    public navCtrl: NavController,
    public alert: AlertsProvider,
    public apiDriver: DriverAuthProvider,
    public loadingCtrl: LoadingController,
    public db: StorageDb,
    public cart: CartProvider,
    public navParams: NavParams) {

      // this.setAvailabilityTx()
      this.getMySelectedVehicle()
  }

  ngAfterViewInit(){
    this.navTitle === undefined ? this.modeTitle = false : this.modeTitle = true
    // this.getMySelectedVehicle()
  }

  setAvailabilityTx(){
    this.driver_available ? this.tx_available = 'Disponible': this.tx_available = 'Activar'
  }

  availabilityChange(e, availability){
    this.cart.setInService(availability, this.vehicle_id).then(res =>{
      console.log('setInService' + JSON.stringify(res))
      console.log('setInService ' + availability)
      this.driver_available = availability
      this.setAvailabilityTx()

    })
  }

  getMySelectedVehicle(){
    this.cart.getMySelected().then(res =>{
      console.log(JSON.stringify(res))
      this.plate = res['data']['data'].placa
      this.driver_available = res['data']['data'].state      
      this.vehicle_id = res['data']['data']._id
      this.setAvailabilityTx()
    }).catch(e =>{
      console.error(e)
    })
  }

  chat(){
    this.navCtrl.push('ChatGlobalDriverPage')
  }

  goBack(){
    this.navCtrl.pop()
  }

  logout(){
    const loader = this.loadingCtrl.create({})
    loader.present()
    this.alert.showConfirm('Confirmar cerrar sesión', '', 'Aceptar', 'Cancelar').then(res =>{
      loader.dismiss()
      if(res === 1){
        this.apiDriver.logout().then(res =>{
          this.navCtrl.setRoot('MainSharedPage')
        })
      }
    })
  }
}
