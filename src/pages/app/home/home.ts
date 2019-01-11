import { Component } from '@angular/core'
import { NavController, MenuController, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '../../../providers/alerts'
import { DriverAuthProvider } from '../../../providers/api/driverAuth'

import { MainPage } from '../../auth/main/main'
import { ChatPage } from '../chat/chat'
import { CartsPage } from '../carts/carts'
import { DriveProfilePage } from '../driver-profile/driver-profile'
import { FindFreightPage } from '../freight/find-freight/find-freight'
import { MyFreightPage } from '../freight/my-freight/my-freight';

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
    this.navCtrl.push(CartsPage)
  }

  myFreight(){
    this.navCtrl.push(MyFreightPage)
  }

  profile(){
    this.navCtrl.push(DriveProfilePage)
  }

  availability(){
    
  }

  findFreight(){
    this.navCtrl.push(FindFreightPage)
  }

  chat(){
    this.navCtrl.push(ChatPage)
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
