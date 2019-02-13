import { Component } from '@angular/core'
import { IonicPage, ViewController, NavParams } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'modal-radio-driver',
  templateUrl: 'modal-radio.html'
})

export class ModalRadioDriverComponent {

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

    }
  }

  onItemSelected(e){
    // console.log(e + ' ' + this.selected)
  }

  goBack(mode){
    let options
    if(mode === 0){
      options = null
    }else if(mode === 1){
      options = this.selected
    }
    console.log(options)
    this.viewCtrl.dismiss({radio: options})
  }

}
