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

  constructor(
    public navCtrl: NavController,
    public cart: CartProvider,
    public navParams: NavParams
    ) {


  }

  ionViewDidLoad(){
    this.getVehicles()
  }


  vehicleDetails(data){
    this.navCtrl.push('DetailsVehiclesDriverPage', { vehicle: data })
  }

  getVehicles(){
    this.cart.getVehiclesList().then(res =>{
      this.vehicles = res['data']['data']
      console.log('vehicles ' + JSON.stringify(this.vehicles))
    })
  }

}
