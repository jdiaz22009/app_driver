import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-details-freight',
  templateUrl: 'details-freight.html'
})
export class DetailsFreightPage {

  title: string = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      
      this.title = this.navParams.get('title')
  }

  
}
