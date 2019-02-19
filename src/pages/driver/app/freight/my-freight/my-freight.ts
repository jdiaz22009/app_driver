import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { FreightProvider } from '@providers/api/freight'


@IonicPage()
@Component({
  selector: 'my-freight-driver',
  templateUrl: 'my-freight.html'
})
export class MyFreightDriverPage {

  // myOffers: any = []

  allOffers: any = []
  assignedOffers: any = []
  historyOffers: any = []

  listType: string


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public offer: FreightProvider
    ) {


  }

  ionViewDidLoad(){
    this.listType = 'all'
    this.getMyOffers()
  }

  getMyOffers(){
    this.offer.getDriverMyOffers().then(res =>{
      // console.log(JSON.stringify(res))
      this.allOffers = res['data']['data']
    })
  }

  freightDetails(){

  }


}
