import { Component } from '@angular/core'

import { CallNumber } from '@ionic-native/call-number'
import { SocialSharing } from '@ionic-native/social-sharing'

import { CONFIG } from '@providers/config'

@Component({
  selector: 'contact-shared',
  templateUrl: 'contact.html'
})
export class ContactSharedComponent {  
    
  constructor(
    private socialSharing: SocialSharing,
    private callNumber: CallNumber,
  ){
     

  }

  call(){
    this.callNumber.callNumber(CONFIG.support.phone, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err))
  }

  email(){
    this.socialSharing.shareViaEmail('Cordial Saludo, necesito soporte para acceder a mi cuenta, mis datos son: ', 'Soporte app móvil', ['info@cargaya.com']).then(() => {
      console.log('Success!')
    }).catch((e) => {
      console.error('Error! ' + e)
    })
  }

  whatsapp(){
    this.socialSharing.shareViaWhatsAppToReceiver(
      CONFIG.support.whatsapp,
      "Hola necesito soporte"
    )
  }

}
