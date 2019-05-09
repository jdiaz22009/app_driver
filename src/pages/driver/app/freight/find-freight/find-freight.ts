import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import 'rxjs/add/operator/map'

import { SocialSharing } from '@ionic-native/social-sharing'

import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'
import { FreightProvider } from '@providers/api/freight'

@IonicPage()
@Component({
  selector: 'find-freight-driver',
  templateUrl: 'find-freight.html'
})
export class FindFreightDriverPage {

  offers: any = []
  user_id: string

  constructor(
    public navCtrl: NavController,
    public apiFreight: FreightProvider,
    public db: StorageDb,
    public navParams: NavParams,
    private socialSharing: SocialSharing) {

  }

  ionViewWillEnter(){
    this.getFreights()
  }

  async getUserId(){
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      return res.userId
    })
  }

  async getFreights(){
    const userId = await this.getUserId()
    console.log('UserId ' + userId)
    this.apiFreight.getOffert().then(res =>{
      // console.log(JSON.stringify(res))
      const data = res['data']
      const array = []

      data.forEach(e => {
         const drivers = e['postulantes']
         if(drivers.length > 0){
           let isDriver = false
            for(let i of drivers){
              if(i._id === userId){
                isDriver = true
              }
            }
            if(!isDriver){
              array.push(e)
            }
         }else{
           array.push(e)
         }
      })

      if(array.length > 0){
        array.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
      }
      // console.log(JSON.stringify(array))
      // console.log(JSON.stringify(data))
      this.offers = array

    }).catch(e =>{
      console.error(e)
    })
  }

  freightDetails(freight){
    this.navCtrl.push('DetailsFreightDriverPage', { id: freight._id, mode: 0})
  }

  doRefresh(refresher) {
    this.getFreights()
    setTimeout(() => {
      refresher.complete()
    }, 2000)
  }

  shared(freight){
    const message = `No DE PEDIDO: ${freight.pedido}. Ruta: ${freight.ciudad_origen.toUpperCase()}-${freight.ciudad_destino.toUpperCase()}. Vehículo: ${freight.clase_vehiculo.toUpperCase()}-${freight.tipo_carroceria.toUpperCase()}. Peso: ${freight.peso_carga_max} TON. CONTACTO: ${freight.coordinador.primer_nombre.toUpperCase()} ${freight.coordinador.primer_apellido.toUpperCase()}, ${freight.coordinador.celular}, Si quieres pago contra entrega, pregunta por PagaYa!!! http://tiny.cc/u09z5y`
    const subject  = 'Carga Disponible, postulate'
    const file = null
    const url = null

    this.socialSharing.share(message, subject, file, url)
  }

}
