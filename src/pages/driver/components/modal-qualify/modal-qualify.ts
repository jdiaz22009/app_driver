import { Component } from '@angular/core'
import { IonicPage, ViewController, NavParams } from 'ionic-angular'

import { FreightProvider } from '@providers/api/freight'
import { AlertsProvider } from '@providers/alerts'

@IonicPage()
@Component({
  selector: 'modal-qualify-driver',
  templateUrl: 'modal-qualify.html'
})

export class ModalQualifyDriverComponent {

  wheelActive: string = './assets/imgs/steering-wheel-green.png'
  wheelDisable: string = './assets/imgs/steeringwheel.png'

  btnRank: any = [
    {img: this.wheelDisable, active: false },
    {img: this.wheelDisable, active: false },
    {img: this.wheelDisable, active: false},
    {img: this.wheelDisable, active: false},
    {img: this.wheelDisable, active: false}
  ]

  comment: string = ''

  offerId: string = ''
  authorId: string = ''
  qualify: number = 0

  constructor(
    public viewCtrl: ViewController,
    public freight: FreightProvider,
    private params: NavParams,
    public alert: AlertsProvider
  ){

    this.offerId = this.params.get('offerId')
    this.authorId = this.params.get('authorId')

  }

  goBack(){
    this.viewCtrl.dismiss()
  }

  onQualify(item){
    const itemIndex = this.btnRank.indexOf(item)
    console.log(itemIndex)

    this.btnRank.map((item, index) =>{
      if(index <= itemIndex){
        item['img'] = this.wheelActive
        item['active'] = true
      }else{
        item['img'] = this.wheelDisable
        item['active'] = false
      }
    })
    console.log(JSON.stringify(this.btnRank))
    this.qualify =  itemIndex + 1
    // console.log('QUALIFY ' + this.qualify)
  }

  send(){
    console.log('qualify ' + this.qualify)
    console.log('comment ' + this.comment)
    console.log('author '+ this.authorId)

    this.freight.saveQualifyCompany(this.offerId, this.authorId, this.qualify, this.comment).then(res =>{
      console.log('saveQualify ' + JSON.stringify(res))
      this.alert.showAlert('Calificación', 'Hemos enviado la calificación')
      this.viewCtrl.dismiss()
    }).catch(e =>{
      console.error(e)
      this.alert.showAlert('Error', 'Ha ocurrido un error interno, intenta de nuevo.')
      this.viewCtrl.dismiss()
    })
  }

}
