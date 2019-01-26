import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DriverAuthProvider } from "@providers/api/driverAuth";
@IonicPage()
@Component({
  selector: 'list-vehicles',
  templateUrl: 'list-vehicles.html'
})
export class ListVehiclesDriverPage {

  drivers:any = [];
  
  constructor(
    public navCtrl: NavController,
    public driveAuthProvider: DriverAuthProvider,
    public navParams: NavParams
    ) {
     

  }

  ionViewDidLoad(){
    this.getConductor();
   // console.log('=========ionview',this.driveAuthProvider.getDriver()
    //);
  }


  vehicleDetails(){
    this.navCtrl.push('DetailsVehiclesDriverPage')
  }

  getConductor(){
  this.driveAuthProvider.getDriver()
  .then(res =>{            
    const data = res['data'];
    console.log('=========data',data);
      for(let driver of data){        
        console.log('===========DRIVERS',driver);
         if(driver['documento'] != undefined){
          this.drivers.push(driver);
         }
      }
    //console.log(this.offers)      
  }).catch(e =>{
    console.error(e)
  })
}

}
