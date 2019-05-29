import { Component } from '@angular/core'
import { IonicPage, ViewController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'modal-qualify-driver',
  templateUrl: 'modal-qualify.html'
})

export class ModalQualifyDriverComponent {

  wheelActive: string = './assets/imgs/steering-wheel-green.png'
  wheelDisable: string = './assets/imgs/steeringwheel.png'

  btnRank: any = [
    {index: 1, model: 'wheel1', img: this.wheelDisable, active: false },
    {index: 2, model: 'wheel2', img: this.wheelDisable, active: false },
    {index: 3, model: 'wheel3', img: this.wheelDisable, active: false},
    {index: 4, model: 'wheel4', img: this.wheelDisable, active: false},
    {index: 5, model: 'wheel5', img: this.wheelDisable, active: false}
  ]

  comment: string = ''

  constructor(
    public viewCtrl: ViewController
  ){

  }

  goBack(mode){
    this.viewCtrl.dismiss({mode: mode})
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
    console.log('QUALIFY ' + (itemIndex +1))
  }

  send(){
    const qualify = this.btnRank.map((item, index) =>{
      if(!item.active){
        return index
      }

      if(index === this.btnRank.length){
        return index
      }
    })
    console.log(qualify)
    console.log(this.comment)
  }

}
