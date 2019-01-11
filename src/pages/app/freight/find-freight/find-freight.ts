import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

import { FreightProvider } from '../../../../providers/api/freight'
import { DetailsFreightPage } from '../details-freight/details-freight'

@Component({
  selector: 'page-find-freight',
  templateUrl: 'find-freight.html'
})
export class FindFreightPage {

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
      console.log(res, 'PERAFO')
      console.log(JSON.stringify(res))
    }).catch(e =>{
      console.error(e)
    })
  }

  freightDetails(freight){
    this.navCtrl.push(DetailsFreightPage, { details: freight})
  }
}
