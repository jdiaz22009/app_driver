import { Component } from "@angular/core"
import { IonicPage, NavController, NavParams } from "ionic-angular"
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { RegisterDriver } from '@models/registerDriver'
import { DriverAuthProvider } from "@providers/api/driverAuth"

@IonicPage()
@Component({
    selector: 'profile-basic',
    templateUrl: 'profile-basic.html'
})

export class ProfileBasicPage {

  profileForm: FormGroup
  userProfile = {} as RegisterDriver

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  id_validator =  /^\d+$/

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: DriverAuthProvider,
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
          Validators.minLength(3),
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
    this.profileForm.controls['id'].setValue(user.documento)
    this.profileForm.controls['first_name'].setValue(user.primer_nombre)
    this.profileForm.controls['second_name'].setValue(user.segundo_nombre)
    this.profileForm.controls['first_lastname'].setValue(user.primer_apellido)
    this.profileForm.controls['second_lastname'].setValue(user.segundo_apellido)
    this.profileForm.controls['mobil'].setValue(user.celular)
    this.profileForm.controls['email'].setValue(user.email)
  }

  async update(){
    this.userProfile.id = this.profileForm.controls['id'].value
    this.userProfile.first_name = this.profileForm.controls['first_name'].value
    this.userProfile.second_name = this.profileForm.controls['second_name'].value
    this.userProfile.first_lastname = this.profileForm.controls['first_lastname'].value
    this.userProfile.second_lastname = this.profileForm.controls['second_lastname'].value
    this.userProfile.mobil = this.profileForm.controls['mobil'].value
    this.userProfile.email = this.profileForm.controls['email'].value

    this.auth.upatedrivers(this.userProfile).then(res=> {
      console.log(JSON.stringify(res))
    }).catch(e => console.error(e))
  }

}
