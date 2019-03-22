import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { RegisterDriver } from '@models/registerDriver'
import { DriverAuthProvider } from '@providers/api/driverAuth'

import { AlertsProvider } from '@providers/alerts'

@IonicPage()
@Component({
    selector: 'profile-basic',
    templateUrl: 'profile-basic.html'
})

export class ProfileBasicPage {

  profileForm: FormGroup
  userProfile = {} as RegisterDriver

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  id_validator = /^\d+$/

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: DriverAuthProvider,
    public loadingCtrl: LoadingController,
    public alert: AlertsProvider,
    private formBuilder: FormBuilder) {

      this.profileForm = this.formBuilder.group({
        id: ['', Validators.compose([
          Validators.pattern(this.id_validator),
          Validators.minLength(6),
          Validators.required
        ])],
        first_name: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])],
        second_name: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])],
        first_lastname: ['', Validators.compose([
          Validators.minLength(2),
          Validators.required
        ])],
        second_lastname: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])],
        mobil: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])],
        email: ['', Validators.compose([
          Validators.pattern(this.email_validator),
          Validators.required
        ])]
       })

      const user = this.navParams.get('profile')
      if(user != undefined){
        this.loadProfile(user)
      }
  }

  loadProfile(user){
    const profileInput = this.profileForm.controls

    profileInput['id'].setValue(user.documento)
    this.toCapitalize(user.primer_nombre, 'first_name')
    this.toCapitalize(user.segundo_nombre, 'second_name')
    this.toCapitalize(user.primer_apellido, 'first_lastname')
    this.toCapitalize(user.segundo_apellido, 'second_lastname')

    profileInput['mobil'].setValue(user.celular)
    profileInput['email'].setValue(user.email)
  }

  async update(){
    this.userProfile.id = this.profileForm.controls['id'].value
    this.userProfile.first_name = this.profileForm.controls['first_name'].value
    this.userProfile.second_name = this.profileForm.controls['second_name'].value
    this.userProfile.first_lastname = this.profileForm.controls['first_lastname'].value
    this.userProfile.second_lastname = this.profileForm.controls['second_lastname'].value
    this.userProfile.mobil = this.profileForm.controls['mobil'].value
    this.userProfile.email = this.profileForm.controls['email'].value

    const loader = this.loadingCtrl.create({})
      loader.present()
    this.auth.upatedrivers(this.userProfile).then(res=> {
      console.log(JSON.stringify(res))
      this.navCtrl.pop()
      loader.dismiss()
      this.alert.showAlert('Perfil Actualizado', 'Se ha actualizado tu perfil correctamente')
      
    }).catch(e => {
      console.error(e)
      loader.dismiss()
      this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tus datos, intenta de nuevo.')
    })
  }

  toCapitalize(v, property){
    let value
    if(typeof(v) === 'string'){
      value = v.charAt(0).toUpperCase() + v.slice(1)
    }else if(typeof(v) === 'object'){
      value = v._value.toString().charAt(0).toUpperCase() + v._value.toString().slice(1)
    }
    if(this.profileForm.controls[property] !== undefined){
      this.profileForm.controls[property].setValue(value)
    }
  }

}
