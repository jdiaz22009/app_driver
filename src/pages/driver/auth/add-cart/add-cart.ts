import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AlertsProvider } from '@providers/alerts'
import { CartProvider } from '@providers/api/cart'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

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
  id: number
  plate: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertsProvider,
    public cartApi: CartProvider,
    public driverAuth: DriverAuthProvider,
    private formBuilder: FormBuilder,
    public db: StorageDb,
    public loadingCtrl: LoadingController
    ) {

      this.id = navParams.get('id')

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


      this.cartApi.add(this.cart).then(res =>{
        console.log(res)
        const code = res['data'].code
        if(code === 100){
          loader.dismiss()
          this.navCtrl.setRoot('home-drive')
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
      const prev = this.cartForm.controls['license_plate'].value
      if(plate.length <= 7){

        console.log(plate + ' ' + plate.length +' ' + prev)

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

}
