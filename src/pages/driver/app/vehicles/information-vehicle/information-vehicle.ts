import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Cart } from '@models/cart'

@IonicPage()
@Component({
  selector: 'information-vehicle',
  templateUrl: 'information-vehicle.html'
})
export class InformationVehiclesDriverPage {

  cart = {} as Cart
  cartForm: FormGroup
  prevPlate: boolean = false
  id: number
  mode: number
  plate: string

  vehicle: any

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

      this.vehicle = navParams.get('vehicle')

      this.cartForm = this.formBuilder.group({
        license_plate: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(7)
        ])],
        type: ['', Validators.required],
        bodywork: ['', Validators.required],
        model: ['', Validators.required],
        brand: ['', Validators.required]
      })

      this.cartForm.controls['license_plate'].setValue(this.vehicle.placa)
      this.cartForm.controls['type'].setValue(this.vehicle.clase_vehiculo)
      this.cartForm.controls['bodywork'].setValue(this.vehicle.tipo_carroceria)
      this.cartForm.controls['model'].setValue(this.vehicle.modelo)
      this.cartForm.controls['brand'].setValue(this.vehicle.marca)

  }

  onChangePlate(v){
    let plate = v._value.toString().toUpperCase()
    const prev = this.cartForm.controls['license_plate'].value
    if(plate.length <= 7){

      if(plate.length < 3){
        this.prevPlate = false
      }

      if(plate.length === 3 && !this.prevPlate){
        this.prevPlate = true
        plate += '-'
      }
      this.plate = plate
      this.cartForm.controls['license_plate'].setValue(plate)
    }else{
      this.cartForm.controls['license_plate'].setValue(this.plate)
    }

  }

  save(){

      const loader = this.loadingCtrl.create({})
      loader.present()

      this.cart.license_plate = this.cartForm.controls['license_plate'].value
      this.cart.type = this.cartForm.controls['type'].value
      this.cart.bodywork = this.cartForm.controls['bodywork'].value
      this.cart.model = this.cartForm.controls['model'].value
      this.cart.brand = this.cartForm.controls['brand'].value

  }


}
