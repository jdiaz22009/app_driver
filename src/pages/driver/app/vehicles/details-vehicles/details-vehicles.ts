import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { CartProvider } from '@providers/api/cart'

@IonicPage()
@Component({
  selector: 'details-vehicles',
  templateUrl: 'details-vehicles.html'
})
export class DetailsVehiclesDriverPage {

  data: any = [
    {thumb: './assets/imgs/truck1.png', title: 'Información Básica', summary: 'Edite tipo de vehículo', page: 'InformationVehiclesDriverPage'},
    {thumb: './assets/imgs/truck1.png', title: 'Información Complementaria', summary: 'Edita clase, carrocería...', page: 'AdditionalInfoVehiclesDriverPage'},
    {thumb: './assets/imgs/truck-card.png', title: 'Datos del propietario/Tenedor', summary: 'Edita datos del propietario', page: 'OwnerDataVehiclesDriverPage'},
    {thumb: './assets/imgs/profile-card.png', title: 'Fotos', summary: 'Edita SOAT, tecnicomecánica...', page: 'PhotosVehiclesDriverPage'}
  ]

  vehicle: any
  showInformation: boolean = false

  constructor(
    public navCtrl: NavController,
    public cartApi: CartProvider,
    public navParams: NavParams) {

  }

  ionViewDidEnter(){
    const cart = this.navParams.get('vehicle')
    this.getVehicle(cart._id)
  }

  getVehicle(id){
    this.cartApi.getVehicleById(id).then(res =>{
      this.vehicle = res['data']
      this.showInformation = true
      console.log(JSON.stringify(res))
    })
  }

  goPage(page){
    this.navCtrl.push(page, {vehicle: this.vehicle})
  }

}
