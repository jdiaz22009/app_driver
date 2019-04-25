import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { CartProvider } from '@providers/api/cart'

@IonicPage()
@Component({
  selector: 'list-vehicles',
  templateUrl: 'list-vehicles.html'
})
export class ListVehiclesDriverPage {

  vehicles : any = []
  userId: string

  constructor(
    public navCtrl: NavController,
    public cart: CartProvider,
    public navParams: NavParams
    ) {


  }

  ionViewWillEnter(){
    this.getVehicles()
  }

  vehicleDetails(data){
    this.navCtrl.push('DetailsVehiclesDriverPage', { vehicle: data })
  }

  getVehicles(){
    this.cart.getVehiclesList().then(res =>{
      //console.log(JSON.stringify(res))
      this.vehicles = res['data']['data']
      if(this.vehicles.length > 0){
        this.userId = this.vehicles[0].conductor
      }
    })
  }

  addVehicle(){
    this.navCtrl.push('AddCartDriverPage', {id: this.userId , mode: 1 })
  }

  removeVehicle(vehicle){

  }

}
