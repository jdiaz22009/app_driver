import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'

import { CartsPage } from '../carts/carts'
import { DriveProfilePage } from '../driver-profile/driver-profile'
import { FindFreightPage } from '../freight/find-freight/find-freight'
import { MyFreightPage } from '../freight/my-freight/my-freight'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,    
    public loadingCtrl: LoadingController,
    ) {

  }

  ionViewDidLoad() {
        
  }

  myCarts(){
    this.navCtrl.push(CartsPage)
  }

  myFreight(){
    this.navCtrl.push(MyFreightPage)
  }

  profile(){
    this.navCtrl.push(DriveProfilePage)
  }

  availability(){
    
  }

  findFreight(){
    this.navCtrl.push(FindFreightPage)
  }

}
