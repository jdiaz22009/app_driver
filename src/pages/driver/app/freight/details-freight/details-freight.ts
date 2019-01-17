import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'details-freight-driver',
  templateUrl: 'details-freight.html'
})
export class DetailsFreightDriverPage {

  title: string = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      
      this.title = this.navParams.get('title')
  }

  
}
