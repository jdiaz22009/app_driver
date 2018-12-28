import { Component } from '@angular/core'
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { User } from '../../../models/user'

import { AlertsProvider } from '../../../providers/alerts'
import { AuthProvider } from '../../../providers/auth'

import { HomePage } from '../../app/home/home'
import { SupportPage } from '../support/support'
import { RegisterPage } from '../register/register'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User
  idForm: FormGroup
  passwordForm: FormGroup

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  password_validator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
  id_validator =  /^\d+$/ 

  sectionSelected: number = 0

  user_type: string = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    private formBuilder: FormBuilder,
    private auth: AuthProvider,
    public loadingCtrl: LoadingController,
    public menu: MenuController
    ) {

      this.idForm = this.formBuilder.group({
        id: ['', Validators.compose([
          Validators.pattern(this.id_validator),
          Validators.minLength(6),
          Validators.required
        ])]
      });

      this.passwordForm = this.formBuilder.group({
        password: ['', Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])]
      });

      if(this.navParams.get('mode') === 'driver'){
        this.user_type = 'Conductor'
      }else if(this.navParams.get('mode') === 'dispatcher'){
        this.user_type = 'Empresa'
      } 
    }

  ionViewDidLoad() {
    this.menu.enable(false)
  }

  ionViewDidEnter() {
    this.sectionSelected = 1
  }

  validateId(){
    const id = parseInt(this.idForm.controls['id'].value)
    this.auth.validateId(id).then(res =>{
      console.log('validateId ' + res)
      if(res){
        this.sectionSelected = 2
      }else{
        this.navCtrl.push(RegisterPage)
      }
    })
    
  }

  login(){    

    const loader = this.loadingCtrl.create({})
    loader.present()

    this.user.id = parseInt(this.idForm.controls['id'].value)
    this.user.password = this.passwordForm.controls['password'].value
    console.log(this.user)
    this.auth.login(this.user).then(result =>{
      console.log(result)
      if(result){
        loader.dismiss()
        this.navCtrl.setRoot(HomePage)
      }else{
        loader.dismiss()      
        this.alert.showAlert('error', 'No se encuentra el usuario, verifique los datos e intente de nuevo')         
      }      
    }).catch(e =>{
      console.log(e)
      loader.dismiss()      
      this.alert.showAlert('error', 'No se encuentra el usuario, verifique los datos e intente de nuevo')         
    })
 
  }
 
  getSupport(){
    this.navCtrl.push(SupportPage)
  }

}
