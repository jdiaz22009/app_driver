import { Component } from '@angular/core'
import { IonicPage, ViewController, NavParams } from 'ionic-angular'
@IonicPage()
@Component({
  selector: 'modal-list-driver',
  templateUrl: 'modal-list.html'
})

export class ModalListDriverComponent {

  data: any
  dataPrev: any
  dataFilter: any
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

    setTimeout(() =>{
      if(params != null){
        this.title = params['title']
        this.data = params['options']
        this.dataPrev = this.data
      }

      if(this.radio != ''){
        this.selected = this.radio
      }
    }, 100)

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
    this.selected = city
    this.goBack(1)
  }

  getItems(ev: any) {
    this.data = this.dataPrev
    const val = ev.target.value
    if (val && val.trim() != '') {
      let dataArray = []
      this.data.map(item =>{
        item.ciudades.filter(city =>{
          if((city.toLowerCase().indexOf(val.toLowerCase()) > -1)){
            dataArray.push({
              departamento: item.departamento,
              ciudades: [city]
            })
          }
        })
      })
      this.data = dataArray
    }
  }

}
