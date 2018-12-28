import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  title: string = ''
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

      this.title = this.navParams.get('title')

  }

}
