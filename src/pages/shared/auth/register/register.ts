import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { RegisterDriver } from '@models/registerDriver'
import { User } from '@models/user'

import { DriverAuthProvider } from '@providers/api/driverAuth'
import { AlertsProvider } from '@providers/alerts'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

@IonicPage()
@Component({
  selector: 'register-shared',
  templateUrl: 'register.html',
})
export class RegisterSharedPage {

  user = {} as RegisterDriver
  login = {} as User

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  password_validator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
  id_validator =  /^\d+$/

  registerForm: FormGroup

  prevId: number
  mode: String

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertsProvider,
    private auth: DriverAuthProvider,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public db: StorageDb,
    public loadingCtrl: LoadingController
    ) {

      this.prevId = navParams.get('id')
      this.mode = navParams.get('mode')

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
      })     
      
    }

    checkId(){
      this.user.id = parseInt(this.registerForm.controls['id'].value)
      console.log(this.user.id + ' ' + this.prevId)
      if(this.user.id != this.prevId){
        const modal = this.modalCtrl.create('ModalIdSharedComponent', null, { cssClass: 'modal-id' })
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
            if(code === 100){              

              const sessionData = {
                user: this.login.id,
                password: this.login.password,
                token: res['data'].token,
                type: 'driver'
              }
              this.db.setItem(CONFIG.localdb.USER_KEY, sessionData).then(res =>{
                loader.dismiss()
                this.navCtrl.setRoot('AddCartDriverPage', {id: this.user.id}) 
              }).catch(e =>{
                console.log(e)
                this.alert.showAlert('Error', 'Error al crear la sesión')
              })

            }else{
              loader.dismiss()
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
