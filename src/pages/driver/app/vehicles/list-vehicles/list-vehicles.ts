import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DriverAuthProvider } from "@providers/api/driverAuth";
@IonicPage()
@Component({
  selector: 'list-vehicles',
  templateUrl: 'list-vehicles.html'
})
export class ListVehiclesDriverPage {

  driver:any = [];
  
  constructor(
    public navCtrl: NavController,
    public driveAuthProvider: DriverAuthProvider,
    public navParams: NavParams
    ) {
     

  }

  ionViewDidLoad(){
    this.getConductor();
  }


  vehicleDetails(){
    this.navCtrl.push('DetailsVehiclesDriverPage')
  }

  getConductor(){
  this.driveAuthProvider.getDriver()
  .then(resp =>{
    console.log('========VISIBLE WEY AQUIIIIII', resp['data']);
    this.driver = resp
  })
  .catch((error)=>{
    return error;
  })
  }

}
