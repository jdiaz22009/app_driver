import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { StorageDb } from '@providers/storageDb'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { AlertsProvider } from '@providers/alerts'
import { DataUserC } from '@models/dataUserC'



@IonicPage()
@Component({
  selector: 'profile-reference-driver',
  templateUrl: 'profile-reference.html'
})
export class ProfileReferenceDriverPage {
  driver = {} as DataUserC

  referenceForm: FormGroup

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  id_validator = /^\d+$/

  profile_reference: any = {}



  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    public auth: DriverAuthProvider,
    public loadingCtrl: LoadingController,
    public alert: AlertsProvider) {

    const user = this.navParams.get('profile')

    console.log('--ProfileReference-- user: ', user)
    this.setForms()

    if (user != null) {
      this.referenceForm.controls['name'].setValue(user.ref_nombre1)
      this.referenceForm.controls['company'].setValue(user.ref_empresa1)
      this.referenceForm.controls['phone'].setValue(user.ref_telefono1)

      this.referenceForm.controls['name1'].setValue(user.ref_nombre2)
      this.referenceForm.controls['company1'].setValue(user.ref_empresa2)
      this.referenceForm.controls['phone1'].setValue(user.ref_telefono2)

      this.referenceForm.controls['name2'].setValue(user.ref_nombre3)
      this.referenceForm.controls['company2'].setValue(user.ref_empresa3)
      this.referenceForm.controls['phone2'].setValue(user.ref_telefono3)

    }
  }

  setForms() {
    this.referenceForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.pattern(this.id_validator),
        Validators.minLength(0),
        // Validators.required
      ])],
      company: ['', Validators.compose([
        Validators.minLength(0),
        // Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.minLength(0),
        // Validators.required
      ])],
      name1: ['', Validators.compose([
        Validators.pattern(this.id_validator),
        Validators.minLength(0),
        // Validators.required
      ])],
      company1: ['', Validators.compose([
        Validators.minLength(0),
        // Validators.required
      ])],
      phone1: ['', Validators.compose([
        Validators.minLength(0),
        // Validators.required
      ])],
      name2: ['', Validators.compose([
        Validators.pattern(this.id_validator),
        Validators.minLength(0),
        // Validators.required
      ])],
      company2: ['', Validators.compose([
        Validators.minLength(0),
        // Validators.required
      ])],
      phone2: ['', Validators.compose([
        Validators.minLength(0),
        // Validators.required
      ])],
    })
  }

  save() {

    this.driver.ref_nombre1 = this.referenceForm.controls['name'].value
    this.driver.ref_empresa1 = this.referenceForm.controls['company'].value
    this.driver.ref_telefono1 = this.referenceForm.controls['phone'].value

    this.driver.ref_nombre2 = this.referenceForm.controls['name1'].value
    this.driver.ref_empresa2 = this.referenceForm.controls['company1'].value
    this.driver.ref_telefono2 = this.referenceForm.controls['phone1'].value

    this.driver.ref_nombre3 = this.referenceForm.controls['name2'].value
    this.driver.ref_empresa3 = this.referenceForm.controls['company2'].value
    this.driver.ref_telefono3 = this.referenceForm.controls['phone2'].value

    const loader = this.loadingCtrl.create({})
    loader.present()

    console.log('--ProfileReference-- driver: ', this.driver)
    this.auth.updateDriverRef(this.driver).then(res => {
      console.log(res)
      // console.log(JSON.stringify(res))
      loader.dismiss()
      this.alert.showAlert('Perfil Actualizado', 'Se ha actualizado tu perfil correctamente')
    }).catch(e => {
      console.error(e)
      loader.dismiss()
      this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tus datos, intenta de nuevo.')
    })
    this.navCtrl.pop()


  }

  toCapitalize(v, property) {
    let value
    if (typeof (v) === 'string') {
      value = v.charAt(0).toUpperCase() + v.slice(1)
    } else if (typeof (v) === 'object') {
      value = v._value.toString().charAt(0).toUpperCase() + v._value.toString().slice(1)
    }
    if (this.referenceForm.controls[property] !== undefined) {
      this.referenceForm.controls[property].setValue(value)
    }
  }


}
