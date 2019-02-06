import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { FreightProvider } from '@providers/api/freight'


@IonicPage()
@Component({
  selector: 'my-freight-driver',
  templateUrl: 'my-freight.html'
})
export class MyFreightDriverPage {

  myOffers: any = []


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public offer: FreightProvider
    ) {


  }

  ionViewDidLoad(){
    this.getMyOffers()
  }

  getMyOffers(){
    this.offer.getMyOffers().then(res =>{
      console.log(JSON.stringify(res))
      this.myOffers = res['data']
    })
  }


}
