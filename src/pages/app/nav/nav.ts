import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '../../../providers/alerts'
import { DriverAuthProvider } from '../../../providers/api/driverAuth'

import { MainPage } from '../../auth/main/main'
import { ChatPage } from '../chat/chat'

@Component({
  selector: 'nav-component',
  templateUrl: 'nav.html'
})
export class NavPage {

  tx_available: string = ''
  driver_available: boolean = true

  constructor(
    public navCtrl: NavController, 
    public alert: AlertsProvider,
    public apiDriver: DriverAuthProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      
      this.setAvailabilityTx()
  }

  setAvailabilityTx(){
    this.driver_available ? this.tx_available = 'Disponible': this.tx_available = 'Activar'
  }
  
  availabilityChange(availability){    
    this.driver_available = availability
    this.setAvailabilityTx()
  }

  chat(){
    this.navCtrl.push(ChatPage)
  }

  logout(){
    const loader = this.loadingCtrl.create({})
    loader.present()
    this.alert.showConfirm('Confirmar cerrar sesión', '', 'Aceptar', 'cancelar').then(res =>{
      loader.dismiss()
      if(res === 1){
        this.apiDriver.logout().then(res =>{
          console.log('logout')
          this.navCtrl.setRoot(MainPage)
        })  
      }
    })
  }  
}
