import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DriverAuthProvider } from "@providers/api/driverAuth";

@IonicPage()
@Component({
  selector: 'information-vehicle',
  templateUrl: 'information-vehicle.html'
})
export class InformationVehiclesDriverPage {
  drive:any = [];
  document: String = 'final'
  obj: object={};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public driverAuthProvider: DriverAuthProvider) {


  }

  ionViewDidLoad(){
    this.getperfilConductor();
  }

  getperfilConductor(){
    this.driverAuthProvider.getDriver()
    .then(resp => {
      const data = resp['data'];
      console.log('=========data',data.id_driver)
      this.document = data['id_driver']['documento'];
      this.obj=data['id_driver'];
      console.log(this.document);
      return  this.obj;
    })
    .catch(error => {console.log(error)});

  }

}
