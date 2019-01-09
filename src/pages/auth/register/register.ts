import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { RegisterDriver } from '../../../models/registerDriver'

import { AuthProvider } from '../../../providers/auth'
import { AlertsProvider } from '../../../providers/alerts'

import { AddCartPage } from '../add-cart/add-cart'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as RegisterDriver

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  password_validator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
  id_validator =  /^\d+$/ 

  registerForm: FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,  
    private auth: AuthProvider,
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
        mobil: ['', Validators.required],
        email: ['', Validators.compose([
          Validators.pattern(this.email_validator),          
          Validators.required
        ])]        
      });

      this.registerForm.controls['id'].setValue(navParams.get('id'))      
    }  

    register(){

      const loader = this.loadingCtrl.create({})
      loader.present()

      this.user.id = parseInt(this.registerForm.controls['id'].value)
      this.user.first_name = this.registerForm.controls['first_name'].value
      this.user.second_name = this.registerForm.controls['second_name'].value
      this.user.first_lastname = this.registerForm.controls['first_lastname'].value
      this.user.second_lastname = this.registerForm.controls['second_lastname'].value
      this.user.second_lastname = this.registerForm.controls['second_lastname'].value
      this.user.mobil = this.registerForm.controls['mobil'].value
      this.user.email = this.registerForm.controls['email'].value
      this.user.password = this.user.id.toString()
      this.user.phone = 0
      this.user.address = ''

      this.auth.register(this.user).then(res =>{
        console.log(res)
        const code = res['data'].code
        loader.dismiss()
        if(code === 100){
          this.navCtrl.push(AddCartPage) 
        }else{
          const msg = res['data'].message
          this.alert.showAlert('Error', msg)
        }
      }).catch(e =>{
        console.log(e)
        loader.dismiss()      
        this.alert.showAlert('Error', 'No se pudo registrar el usuario, verifique los datos e intente de nuevo')
      })     
      
    }  

}
