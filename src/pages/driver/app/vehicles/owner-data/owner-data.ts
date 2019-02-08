import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@IonicPage()
@Component({
  selector: 'owner-data',
  templateUrl: 'owner-data.html'
})
export class OwnerDataVehiclesDriverPage {

  ownerForm: FormGroup

  owner: any
  step_form: number = 0
  step_images: any = [
    './assets/imgs/step-1-2.png',
    './assets/imgs/step-2-2.png'
  ]
  step_img: string = this.step_images[0]
  btn_txt: string

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {

      this.ownerForm = this.formBuilder.group({
        type: '',
        id_type: '',
        id: '',
        first_name: '',
        second_name: '',
        first_lastname: '',
        second_lastname: '',
        state: '',
        address: '',
        mobil: '',
        phone: ''
      })

  }

  ionViewDidLoad(){
    this.getBtnText()
  }

  getBtnText(){
    this.step_form === 0 ? this.btn_txt = 'Guardar Y Continuar' : this.btn_txt = 'Guardar'
  }

  save(){

  }

  onType(e){
    console.log(e)
    if(e === 'natural'){
      this.step_form = 0
    }else if(e === 'juridica'){
      this.step_form = 1
    }
    this.getBtnText()
  }

}
