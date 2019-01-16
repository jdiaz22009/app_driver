import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { RegisterDriver } from '../../../models/registerDriver'
import { User } from '../../../models/user'

import { DriverAuthProvider } from '../../../providers/api/driverAuth'
import { AlertsProvider } from '../../../providers/alerts'

import { AddCartPage } from '../add-cart/add-cart'
import { ModalRegisterComponent } from '../../components/modal-register/modal-register';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as RegisterDriver
  login = {} as User

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  password_validator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
  id_validator =  /^\d+$/ 

  registerForm: FormGroup

  prevId: number

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,  
    private auth: DriverAuthProvider,
    private formBuilder: FormBuilder,  
    public modalCtrl: ModalController,
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

      this.prevId = navParams.get('id')
      // this.registerForm.controls['id'].setValue(navParams.get('id'))      
    }  

    checkId(){
      this.user.id = parseInt(this.registerForm.controls['id'].value)
      console.log(this.user.id + ' ' + this.prevId)
      if(this.user.id != this.prevId){
        const modal = this.modalCtrl.create(ModalRegisterComponent, null, { cssClass: "modal-id" })
        modal.onDidDismiss(() =>{
          this.navCtrl.pop()
        })
        modal.present()        
        return
      }
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
        
        if(code === 100){
          
          this.login.id = this.user.id
          this.login.password = this.user.password

          this.auth.login(this.login).then(res =>{
            console.log(res)
            const code = res['data'].code
            loader.dismiss()
            if(code === 100){        
              this.navCtrl.setRoot(AddCartPage)
            }else{              
              const msg = res['data'].message
              this.alert.showAlert('Error', msg)         
            }  
             
          }).catch(e =>{
            loader.dismiss()      
            this.alert.showAlert('Error', 'No se encuentra el usuario, verifique los datos e intente de nuevo')         
          })
          
        }else{
          loader.dismiss()
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
