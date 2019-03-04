import { Component, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@IonicPage()
@Component({
  selector: 'additional-information',
  templateUrl: 'additional-information.html'
})
export class AdditionalInfoVehiclesDriverPage {

  @ViewChild(Content) content: Content

  step_form: number = 0
  step_images: any = [
    './assets/imgs/step-1-3.png',
    './assets/imgs/step-2-3.png',
    './assets/imgs/step-3-3.png'
  ]
  step_img: string = this.step_images[0]

  btn_title: string = ' Guardar y Continuar'

  vehicleForm: FormGroup
  vehicleForm0: FormGroup
  vehicleForm1: FormGroup

  gas_category: any = [
    {value: 'Diesel', name: 'Diesel'},
    {value: 'Extra', name: 'Extra'},
  ]

  configuration_category: any = [
    {value: 'Some', name: 'Some'},
  ]

  service_type_category: any = [
    {value: 'Some', name: 'Some'},
  ]

  country_category: any = [
    {value: 'Some', name: 'Some'},
  ]

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {

        this.setForm()
  }

  setForm(){
    this.vehicleForm = this.formBuilder.group({
      engine: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      repowering:['', Validators.compose([
        Validators.required
      ])],
      chassis: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      gas: ['', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])],
      configuration: ['', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])],
      color: ['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      weight: ['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      capacity: ['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      service_type: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      country: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])]
    })


    this.vehicleForm0 = this.formBuilder.group({
      import_declaration:['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
      soat:['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      soat_expiration:['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      soat_company_id:['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      technical_review:['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      technical_review_expiration:['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      trailer:['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      trailer_brand:['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      trailer_model:['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      trailer_plate:['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])]
    })

    this.vehicleForm1 = this.formBuilder.group({
      gps_company:['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      gps_company_web:['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      gps_id:['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      gps_user:['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      gps_password:['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])]
     })
  }

  save(){

    if(this.step_form === 0){
      this.step_form ++
      this.step_img = this.step_images[1]
      this.scrollToTop()
    }else if(this.step_form === 1){
      this.step_form ++
      this.step_img = this.step_images[2]
      this.scrollToTop()
    }else if(this.step_form === 2){

    }
  }

  scrollToTop() {
    this.content.scrollToTop()
  }

  toCapitalize(v, property){
    let value
    if(typeof(v) === 'string'){
      value = v.charAt(0).toUpperCase() + v.slice(1)
    }else if(typeof(v) === 'object'){
      value = v._value.toString().charAt(0).toUpperCase() + v._value.toString().slice(1)
    }
    if(this.vehicleForm.controls[property] !== undefined){
      this.vehicleForm.controls[property].setValue(value)
    }
  }

}
