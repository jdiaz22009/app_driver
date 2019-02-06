import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { CartProvider } from '@providers/api/cart'

@IonicPage()
@Component({
  selector: 'list-vehicles',
  templateUrl: 'list-vehicles.html'
})
export class ListVehiclesDriverPage {

  drivers: any = []

  constructor(
    public navCtrl: NavController,
    public cart: CartProvider,
    public navParams: NavParams
    ) {


  }

  ionViewDidLoad(){
    this.getVehicles()
  }


  vehicleDetails(){
    this.navCtrl.push('DetailsVehiclesDriverPage')
  }

  getVehicles(){
    this.cart.getVehiclesList().then(res =>{
      console.log(JSON.stringify(res))
    })
  }

}
