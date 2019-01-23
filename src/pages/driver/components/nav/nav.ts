import { Component, Input } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '@providers/alerts'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

@Component({
  selector: 'nav-driver-component',
  templateUrl: 'nav.html'
})
export class NavDriverComponent {

  @Input('title') navTitle
  @Input('availability') navAvailability

  title: string
  modeTitle: boolean = false

  tx_available: string = ''
  driver_available: boolean = true
  nav_ava = false

  constructor(
    public navCtrl: NavController,
    public alert: AlertsProvider,
    public apiDriver: DriverAuthProvider,
    public loadingCtrl: LoadingController,
    public db: StorageDb,
    public navParams: NavParams) {

      this.setAvailabilityTx()
  }

  ngAfterViewInit(){
    this.title = this.navTitle
    this.title === undefined ? this.modeTitle = true : this.modeTitle = false
    
    if(this.navAvailability != undefined && this.navAvailability === 'none'){
      this.nav_ava = true    
    }

    console.log(this.navAvailability +  ' ' + this.nav_ava)
  }

  setAvailabilityTx(){
    this.driver_available ? this.tx_available = 'Disponible': this.tx_available = 'Activar'
  }

  async getActiveCart(){
    const cart = await this.db.getItem(CONFIG.localdb.USER_DATA_KEY).then(res =>{       
      return (res !== null) ? res.vehiculos[0]: null      
    })    
    return cart
  }

  async availabilityChange(availability){
    
    const cart = await this.getActiveCart()
    console.log('CART ' + cart)
    this.apiDriver.setInService(availability, cart).then(res =>{
      console.log(res)
      this.driver_available = availability
      this.setAvailabilityTx()
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
    this.alert.showConfirm('Confirmar cerrar sesión', '', 'Aceptar', 'cancelar').then(res =>{
      loader.dismiss()
      if(res === 1){
        this.apiDriver.logout().then(res =>{
          this.navCtrl.setRoot('MainSharedPage')
        })
      }
    })
  }
}
