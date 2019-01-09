import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AlertsProvider } from '../../../providers/alerts'
import { CartProvider } from '../../../providers/api/cart'

import { Cart } from '../../../models/cart'

import { HomePage } from '../../app/home/home'

@Component({
  selector: 'page-add-cart',
  templateUrl: 'add-cart.html',
})
export class AddCartPage {  

  cart = {} as Cart
  cartForm: FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,      
    public cartApi: CartProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController    
    ) {

      this.cartForm = this.formBuilder.group({
        license_plate: ['', Validators.required],
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
        loader.dismiss()
        if(code === 100){
          this.navCtrl.push(HomePage)
        }else{
          const msg = res['data'].message
          this.alert.showAlert('Error', msg)
        }        
      }).catch(e =>{
        console.log(e)
        loader.dismiss()      
        this.alert.showAlert('Error', 'No se pudo registrar el vehículo, verifique los datos e intente de nuevo')
      })

      
    } 

}
