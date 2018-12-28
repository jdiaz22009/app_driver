import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AlertsProvider } from '../../../providers/alerts'
import { Cart } from '../../../models/cart'
import { HomePage } from '../../app/home/home';


@Component({
  selector: 'page-add-cart',
  templateUrl: 'add-cart.html',
})
export class AddCartPage {  

  user = {} as Cart
  cartForm: FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,    
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController    
    ) {

      this.cartForm = this.formBuilder.group({
        license_plate: ['', Validators.required],
        type: ['', Validators.required], 
        bodywork: ['', Validators.required],
        model: ['', Validators.required],
        brand: ['', Validators.required]        
      });
      
    }

    addCart(){
      this.navCtrl.push(HomePage)
    } 

}
