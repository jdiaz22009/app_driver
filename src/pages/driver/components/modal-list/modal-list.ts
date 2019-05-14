import { Component } from '@angular/core'
import { IonicPage, ViewController, NavParams } from 'ionic-angular'
@IonicPage()
@Component({
  selector: 'modal-list-driver',
  templateUrl: 'modal-list.html'
})

export class ModalListDriverComponent {

  data: any
  title: string = ''
  option: any
  selected: any
  radio: any

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ){

    const params = navParams.get('options')
    this.radio = navParams.get('radio')

    console.log(params)

    setTimeout(() =>{
      if(params != null){
        this.title = params['title']
        this.data = params['options']
      }

      if(this.radio != ''){
        this.selected = this.radio
      }
    }, 200)

  }

  goBack(mode){
    let options
    if(mode === 0){
      options = null
    }else if(mode === 1){
      options = this.selected
    }
    this.viewCtrl.dismiss({radio: options})
  }

  selectCity(city){
    console.log(city)
    this.selected = city
    this.goBack(1)
  }

}
