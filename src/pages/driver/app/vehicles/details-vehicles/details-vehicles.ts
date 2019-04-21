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
    {thumb: './assets/imgs/truck1.png', title: 'Información Básica', summary: 'Ingresa tipo de vehículo', page: 'InformationVehiclesDriverPage'},
    {thumb: './assets/imgs/truck1.png', title: 'Información Complementaria', summary: 'Ingresa clase, carrocería...', page: 'AdditionalInfoVehiclesDriverPage'},
    {thumb: './assets/imgs/truck-card.png', title: 'Datos del propietario/Tenedor', summary: 'Ingresa datos del propietario', page: 'OwnerDataVehiclesDriverPage'},
    {thumb: './assets/imgs/profile-card.png', title: 'Fotos documentos del vehículo', summary: 'Ingresa SOAT, tecnicomecánica...', page: 'PhotosVehiclesDriverPage'},
    {thumb: './assets/imgs/profile-card.png', title: 'Fotos del vehículo', summary: 'Fotos de mi nave', page: 'PhotosVehiclesPage'} 
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
