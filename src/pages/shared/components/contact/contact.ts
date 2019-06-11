import { Component, Input } from '@angular/core'

import { CallNumber } from '@ionic-native/call-number'
import { SocialSharing } from '@ionic-native/social-sharing'

import { CONFIG } from '@providers/config'
import { DriverAuthProvider } from '@providers/api/driverAuth'

@Component({
  selector: 'contact-shared',
  templateUrl: 'contact.html'
})
export class ContactSharedComponent {

  textDefault: any = [
    {whatsapp: 'Hola necesito soporte', email: 'Cordial Saludo, necesito soporte para acceder a mi cuenta, mis datos son: ' },
    {whatsapp: 'Hola, soy ', email: 'Cordial Saludo, solicito más información acerca de la oferta: ' }
  ]

  emailTxt: string = ''
  whatsappTxt: string = ''

  @Input('mode') mode
  @Input('offer') offer

  constructor(
    private socialSharing: SocialSharing,
    private callNumber: CallNumber,
    public auth: DriverAuthProvider,
  ){}

  async ngAfterViewInit(){
    this.emailTxt = this.textDefault[this.mode].email

    if(this.offer !== undefined){
      const profile = await this.getDriverProfile()
      if(profile){
        const user = profile['data'].id_driver
        const vehicleSelected = user.vehiculos.map(item =>{
          if(item['select'] && item['state']) return item
        })
        const name = this.validateProperty(user.primer_nombre ) ?  user.primer_nombre.toUpperCase() : ''
        const last_name = this.validateProperty(user.primer_apellido) ? user.primer_apellido.toUpperCase() : ''
        const vehicle_class = this.validateProperty(vehicleSelected[0]['clase_vehiculo']) ? vehicleSelected[0]['clase_vehiculo'].toUpperCase() : ''
        const vehicle_plate =  this.validateProperty(vehicleSelected[0]['placa']) ? vehicleSelected[0]['placa'].toUpperCase() : ''

        const msg = `${name} ${last_name} con tipo de vehículo ${vehicle_class} y placa número ${vehicle_plate}, estoy interesado en la oferta número ${this.offer.pedido}`
        this.whatsappTxt = this.textDefault[this.mode].whatsapp + msg
      }
    }else{
      this.whatsappTxt = this.textDefault[this.mode].whatsapp
    }
  }

  validateProperty(property){
    if(property !== undefined && property !== null && property !== ''){
      return true
    }
    return false
  }

  async getDriverProfile(){
    return await this.auth.getDriver()
  }

  call(){
    this.callNumber.callNumber(CONFIG.support.phone, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err))
  }

  email(){
    this.socialSharing.shareViaEmail(this.emailTxt, 'Soporte app móvil', ['info@cargaya.com']).then(() => {
      console.log('Success!')
    }).catch((e) => {
      console.error('Error! ' + e)
    })
  }

  whatsapp(){
    this.socialSharing.shareViaWhatsAppToReceiver(
      CONFIG.support.whatsapp,
      this.whatsappTxt
    )
  }

}
