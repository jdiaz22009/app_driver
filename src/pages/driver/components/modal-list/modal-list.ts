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
    console.log('radio ' + this.radio + " " + typeof(this.radio))
    if(params != null){
      this.title = params['title']
      this.data = params['options']
    }

    if(this.radio != ''){
      this.selected = this.radio
    }
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

}
