import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Cart } from '@models/cart'

import { AlertsProvider } from '@providers/alerts'
import { CartProvider } from '@providers/api/cart'

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

  vehicle_class = {
    title: 'Clase de vehículo',
    options: [
      {value: 'Camioneta', name: 'Camioneta', checked: false},
      {value: 'Turbo', name: 'Turbo', checked: false},
      {value: 'Sencillo', name:'Sencillo', checked: false},
      {value: 'Doble Troque', name:'Doble Troque', checked: false},
      {value: 'Cuatro Manos', name:'Cuatro Manos', checked: false},
      {value: 'Minimula', name:'Minimula', checked: false},
      {value: 'Tracto Camión', name:'Tracto Camión', checked: false},
      {value: 'Cama Baja', name:'Cama Baja', checked: false},
      {value: 'Niñera', name:'Niñera', checked: false},
    ]
  }

  vehicle_bodywork = {
    title: 'Tipo de carrocería',
    options: [
      {value: 'Carry', name: 'Carry', checked: false},
      {value: 'Estacas', name: 'Estacas', checked: false},
      {value: 'Furgón', name:'Furgón', checked: false},
      {value: 'Furgón Refrigerado', name:'Furgón Refrigerado', checked: false},
      {value: 'Platón', name:'Platón', checked: false},
      {value: 'Plancha', name:'Plancha', checked: false},
      {value: 'Cisterna', name:'Cisterna', checked: false},
      {value: 'Tanque', name:'Tanque', checked: false},
      {value: 'Volco', name:'Volco', checked: false},
      {value: 'Contenedor', name:'Contenedor', checked: false},
      // {value: 'Cama Baja', name:'Cama Baja', checked: false},
      // {value: 'Niñera', name:'Niñera', checked: false}
    ]
  }

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alert: AlertsProvider,
    public cartApi: CartProvider,
    public modalCtrl: ModalController,
    public navParams: NavParams) {

      this.vehicle = navParams.get('vehicle')
      console.log('-InformationVehicle- vehicle: ',this.vehicle)

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
    // const prev = this.cartForm.controls['license_plate'].value
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

  showModal(mode){
    console.log('show modal radio ' + mode)
    let options
    let radio
    if(mode === 0){
        options = this.vehicle_class
        radio = this.cartForm.controls['type'].value
    }else if(mode === 1){
        options = this.vehicle_bodywork
        radio = this.cartForm.controls['bodywork'].value
    }
    const modal = this.modalCtrl.create('ModalRadioDriverComponent', {options, radio })
    modal.present()

    modal.onDidDismiss((data) =>{
      console.log('onDismiss ' + JSON.stringify(data) + ' MODE ' + mode + " " + data)
      if(mode === 0){
        if(data != null){
          this.cartForm.controls['type'].setValue(data.radio)
        }
      }else if(mode === 1){
        if(data != null){
          this.cartForm.controls['bodywork'].setValue(data.radio)
        }
      }
    })
  }

  save(){

      const loader = this.loadingCtrl.create({})
      loader.present()

      this.cart.license_plate = this.cartForm.controls['license_plate'].value
      this.cart.type = this.cartForm.controls['type'].value
      this.cart.bodywork = this.cartForm.controls['bodywork'].value
      this.cart.model = this.cartForm.controls['model'].value
      this.cart.brand = this.cartForm.controls['brand'].value

      this.cartApi.updateVehicle(this.cart, this.vehicle._id).then(res =>{
        console.log(JSON.stringify(res))
        this.navCtrl.pop()
        loader.dismiss()
        this.alert.showAlert('Vehículo Actualizado', 'Se ha actualizado tu vehículo correctamente')
      }).catch(e =>{
        console.error(e)
        loader.dismiss()
        this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tu vehículo, intenta de nuevo.')
      })

  }


}
