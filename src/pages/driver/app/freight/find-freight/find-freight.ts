import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import 'rxjs/add/operator/map'

import { FreightProvider } from '@providers/api/freight'

@IonicPage()
@Component({
  selector: 'find-freight-driver',
  templateUrl: 'find-freight.html'
})
export class FindFreightDriverPage {

  offers: any = []
  constructor(
    public navCtrl: NavController,
    public apiFreight: FreightProvider,
    public navParams: NavParams) {

  }

  ionViewDidLoad(){
    this.getFreights()
  }

  getFreights(){
    this.apiFreight.getOffert()
    .then(res =>{
      const data = res['data']
      // data.reverse()
      data.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
      this.offers = data

    }).catch(e =>{
      console.error(e)
    })
  }

  freightDetails(freight){
    this.navCtrl.push('DetailsFreightDriverPage', { id: freight._id})
  }
}
