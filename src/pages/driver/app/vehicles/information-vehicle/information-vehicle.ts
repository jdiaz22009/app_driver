import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DriverAuthProvider } from "@providers/api/driverAuth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RegisterDriver } from '@models/registerDriver'


@IonicPage()
@Component({
  selector: 'information-vehicle',
  templateUrl: 'information-vehicle.html'
})
export class InformationVehiclesDriverPage {
  
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    

  }

  
}
