import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-find-freight',
  templateUrl: 'find-freight.html'
})
export class FindFreightPage {

  title: string = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      
      this.title = this.navParams.get('title')
  }

  
}
