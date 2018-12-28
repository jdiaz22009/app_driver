import { Component } from '@angular/core'
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { User } from '../../../models/user'

import { AlertsProvider } from '../../../providers/alerts'
import { AuthProvider } from '../../../providers/auth'

import { HomePage } from '../../app/home/home'
import { SupportPage } from '../support/support'

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
  id_validator =  /^\d+$/ // /^\d{9}[V|v|X|x]{6,}$/

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
    this.sectionSelected = 2
  }

  login(){    

    const loader = this.loadingCtrl.create({})
    loader.present()

    this.user.id = this.idForm.controls['id'].value
    this.user.password = this.passwordForm.controls['password'].value

    // this.auth.login(this.user).then(result =>{
    //   console.log(result)
    //   if(result){
    //     loader.dismiss()
    //     this.navCtrl.setRoot(HomePage)
    //   }      
    // }).catch(e =>{
    //   console.log(e)
    //   loader.dismiss()
    //   if(e.code === 'auth/user-not-found'){
    //     this.alert.showAlert('error', 'No se encuentra el usuario, verifique los datos e intente de nuevo')
    //   }else if(e.code === 'auth/wrong-password'){
    //     this.alert.showAlert('error', 'La contraseña es incorrecta')
    //   }      
    // })
 
  }
 
  getSupport(){
    this.navCtrl.push(SupportPage)
  }

}
