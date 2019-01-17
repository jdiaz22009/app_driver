import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular'

import { CallNumber } from '@ionic-native/call-number'
import { SocialSharing } from '@ionic-native/social-sharing'

import { AlertsProvider } from '@providers/alerts'
import { CONFIG } from '@providers/config'

@IonicPage()
@Component({
  selector: 'support-shared',
  templateUrl: 'support.html',
})
export class SupportSharedPage {

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
    this.socialSharing.shareViaWhatsAppToReceiver(
      CONFIG.support.whatsapp,
      "Hola necesito soporte"
    )
  }

  call(){
    this.callNumber.callNumber(CONFIG.support.phone, true)
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
