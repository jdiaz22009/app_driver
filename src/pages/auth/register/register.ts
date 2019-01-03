import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AlertsProvider } from '../../../providers/alerts'
import { Register } from '../../../models/register'
import { AddCartPage } from '../add-cart/add-cart';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as Register

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  password_validator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
  id_validator =  /^\d+$/ 

  registerForm: FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,  
    private formBuilder: FormBuilder,  
    public loadingCtrl: LoadingController    
    ) {


      this.registerForm = this.formBuilder.group({
        id: ['', Validators.compose([
          Validators.pattern(this.id_validator),
          Validators.minLength(6),
          Validators.required
        ])],
        first_name: ['', Validators.required],
        second_name: [''],
        first_lastname: ['', Validators.required],
        second_lastname: [''],
        phone: ['', Validators.required],
        email: ['', Validators.compose([
          Validators.pattern(this.email_validator),          
          Validators.required
        ])],
        password: ['', Validators.compose([
          Validators.minLength(6),        
          Validators.required
        ])],
      });
      
    }  

    register(){
      this.navCtrl.push(AddCartPage)
    } 
  

}
