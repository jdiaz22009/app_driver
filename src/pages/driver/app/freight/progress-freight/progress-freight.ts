import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { FreightProvider } from '@providers/api/freight'
import { ThrowStmt } from '@angular/compiler';


@IonicPage()
@Component({
  selector: 'progress-freight-driver',
  templateUrl: 'progress-freight.html'
})
export class ProgressFreightDriverPage {

  offer: any = []
  item: any
  id: string
  freight_state: number

  btnProgress: string = ''

  progress: any = [
    'Voy en Camino a Cargar',
    'Llegue a origen',
    'Iniciaron Cargue',
    'Conductor Cargado',
    'Voy en tránsito',
    'Llegue a mi destino',
    'Iniciaron descargue',
    'Terminaron descargue Tomar foto soporte',
    'Calificar empresa'
  ]


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public freight: FreightProvider,    
    ) {

    this.id = this.navParams.get('id')
    this.getOfferById(this.id)
  }  

  getOfferById(id){
    this.freight.getOfferById(id).then(res =>{
      this.offer = res['data'].data
      this.freight_state = this.offer['state'].sequence
      console.log('STATE  ' + this.freight_state)
      console.log(JSON.stringify(this.offer))

      switch (this.freight_state) {
        case 4:
          this.btnProgress = this.progress[0]
        break;      
        case 5:
          this.btnProgress = this.progress[1]
        break;      
        default:
          this.btnProgress = this.progress[0]
          break;
      }
    })
  }

  changeState(){
    const state = this.freight_state + 1 + ''
    console.log(state)

    this.freight.updateOfferState(this.offer._id, state).then(res =>{
      console.log(res)
      console.log(JSON.stringify(res))
    })

  }

}
