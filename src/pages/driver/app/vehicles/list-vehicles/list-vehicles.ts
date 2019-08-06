import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { AlertsProvider } from '@providers/alerts'
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
    public navParams: NavParams,
    public alerts: AlertsProvider
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
      // console.log(JSON.stringify(res))
      this.vehicles = res['data']['data']
      if(this.vehicles.length > 0){
        this.userId = this.vehicles[0].conductor
      }
    })
  }

  addVehicle(){
    if(this.vehicles.length >= 1){
      this.alerts.showAlert('Advertencia', 'Solo puedes tener un vehículo')
      return
    }
    this.navCtrl.push('AddCartDriverPage', {id: this.userId , mode: 1 })
  }

  removeVehicle(vehicle){

      this.alerts.showConfirm('Eliminar Vehículo', '¿Deseas eliminar este vehículo?, ten en cuenta que no puedes deshacer esta opción en el futuro.', 'Aceptar', 'Cancelar').then(res =>{
        if(res === 1){
          this.cart.removeVehicle(vehicle._id).then(() =>{
            this.getVehicles()
          }).catch(e =>{
            console.error(e)
            this.alerts.showAlert('Error', 'Ha ocurrido un error al eliminar el vehículo')

          })
        }
    })
  }

}
