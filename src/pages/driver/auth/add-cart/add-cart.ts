import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AlertsProvider } from '@providers/alerts'
import { CartProvider } from '@providers/api/cart'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { StorageDb } from '@providers/storageDb'

import { Cart } from '@models/cart'

@IonicPage()
@Component({
  selector: 'add-cart-driver',
  templateUrl: 'add-cart.html',
})
export class AddCartDriverPage {

  cart = {} as Cart
  cartForm: FormGroup
  prevPlate: boolean = false
  prevModel: number
  id: number
  mode: number
  plate: string

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
      {value: 'Porta Contenedor', name:'Porta Contenedor', checked: false},
      {value: 'Contenedor', name:'Contenedor', checked: false},
      {value: 'Cama Baja', name:'Cama Baja', checked: false},
      {value: 'Niñera', name:'Niñera', checked: false}
    ]
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertsProvider,
    public cartApi: CartProvider,
    public driverAuth: DriverAuthProvider,
    private formBuilder: FormBuilder,
    public db: StorageDb,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
    ) {

      this.id = navParams.get('id')
      this.mode = navParams.get('mode')

      this.cartForm = this.formBuilder.group({
        license_plate: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(7)
        ])],
        type: ['', Validators.required],
        bodywork: ['', Validators.required],
        model: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(4)
        ])],
        brand: ['', Validators.required]
      })
    }

    ionViewDidLoad(){
      this.getCartClass()
    }

    getCartClass(){
      this.cartApi.getVehicleClass().then(res =>{
         console.log(res)
      }).catch(e =>{
        console.error(e)
      })
    }

    addCart(){

      const loader = this.loadingCtrl.create({})
      loader.present()

      this.cart.license_plate = this.cartForm.controls['license_plate'].value
      this.cart.type = this.cartForm.controls['type'].value
      this.cart.bodywork = this.cartForm.controls['bodywork'].value
      this.cart.model = this.cartForm.controls['model'].value
      this.cart.brand = this.cartForm.controls['brand'].value

      console.log(JSON.stringify(this.cart))

      this.cartApi.add(this.cart).then(res =>{
        console.log(res)
        const code = res['data'].code
        if(code === 100){
          loader.dismiss()
          if(this.mode === 0){
            this.navCtrl.setRoot('home-drive')
          }else if(this.mode === 1){
            this.navCtrl.pop()
          }
        }else{
          loader.dismiss()
          const msg = res['data'].message
          this.alert.showAlert('Error', msg)
        }
      }).catch(e =>{
        console.log(e)
        loader.dismiss()
        this.alert.showAlert('Error', 'No se pudo registrar el vehículo, verifique los datos e intente de nuevo')
      })
    }

    onChangePlate(v){
      let plate = v._value.toString().toUpperCase()
      // const prev = this.cartForm.controls['license_plate'].value
      if(plate.length <= 7){

        // console.log(plate + ' ' + plate.length +' ' + prev)

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

    toCapitalize(v, property){
      const value = v._value.toString().charAt(0).toUpperCase() + v._value.toString().slice(1)
      if(this.cartForm.controls[property] !== undefined){
        this.cartForm.controls[property].setValue(value)
      }
    }

}
