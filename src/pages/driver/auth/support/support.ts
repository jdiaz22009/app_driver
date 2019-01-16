import { Component } from '@angular/core'
import { NavController, NavParams, MenuController } from 'ionic-angular'

import { CallNumber } from '@ionic-native/call-number'
import { SocialSharing } from '@ionic-native/social-sharing'

import { AlertsProvider } from '../../../../providers/alerts'


@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private callNumber: CallNumber,
    public alert: AlertsProvider,
    public menu: MenuController,
    private socialSharing: SocialSharing
    ) {


    }
  ionViewDidLoad() {

  }

  whatsapp(){
    const numberPhone = "+573194131358"
    this.socialSharing.shareViaWhatsAppToReceiver(
      numberPhone,
      "Hola necesito soporte"
    )
  }

  call(){
    this.callNumber.callNumber("18001010101", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  email(){

    this.socialSharing.shareViaEmail('Cordial Saludo, necesito soporte para acceder a mi cuenta, mis datos son: ', 'Soporte app móvil', ['info@cargaya.com']).then(() => {
      console.log('Success!')
    }).catch((e) => {
      console.error('Error! ' + e)
    });
  }


}
