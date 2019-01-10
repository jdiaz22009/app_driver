import { Component } from '@angular/core'
import { NavController, MenuController, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '../../../providers/alerts'
import { DriverAuthProvider } from '../../../providers/api/driverAuth'

import { MainPage } from '../../auth/main/main'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  driver_available: boolean = true

  constructor(
    public navCtrl: NavController,
    public alert: AlertsProvider,
    public apiDriver: DriverAuthProvider,
    public loadingCtrl: LoadingController,
    public menu: MenuController) {

  }

  ionViewDidLoad() {
    this.menu.enable(true)
  }

  myCarts(){

  }

  jobs(){

  }

  profile(){

  }

  availability(){
    
  }

  availabilityChange(availability){
    console.log(availability + ' ' + this.driver_available)
  }

  logout(){
    const loader = this.loadingCtrl.create({})
    loader.present()
    this.alert.showConfirm('Cerrar sesión', 'Deseas salir?', 'Salir', 'cancelar').then(res =>{
      loader.dismiss()
      if(res === 1){
        this.apiDriver.logout().then(res =>{
          this.navCtrl.setRoot(MainPage)
        })  
      }
    })
  }

}
