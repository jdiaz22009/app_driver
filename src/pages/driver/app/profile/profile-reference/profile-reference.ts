import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { StorageDb } from '@providers/storageDb'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { AlertsProvider } from '@providers/alerts'


@IonicPage()
@Component({
  selector: 'profile-reference-driver',
  templateUrl: 'profile-reference.html'
})
export class ProfileReferenceDriverPage {

  referenceForm: FormGroup

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  id_validator = /^\d+$/

  profile_reference: any = {}

  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    public auth:DriverAuthProvider,
    public alert:AlertsProvider) {

    this.referenceForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.pattern(this.id_validator),
        Validators.minLength(3),
        Validators.required
      ])],
      company: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      name1: ['', Validators.compose([
        Validators.pattern(this.id_validator),
        Validators.minLength(3),
        Validators.required
      ])],
      company1: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      phone1: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      name2: ['', Validators.compose([
        Validators.pattern(this.id_validator),
        Validators.minLength(3),
        Validators.required
      ])],
      company2: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      phone2: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
    })
  }


  save() {
    const params = [{
      nameReference1: this.referenceForm.controls['name'].value,
      companyReference1: this.referenceForm.controls['company'].value,
      phoneReference1: this.referenceForm.controls['phone'].value,
    },
    {
      nameReference2: this.referenceForm.controls['name1'].value,
      companyReference2: this.referenceForm.controls['company1'].value,
      phoneReference2: this.referenceForm.controls['phone1'].value,
    },
    {
      nameReference3: this.referenceForm.controls['name2'].value,
      companyReference3: this.referenceForm.controls['company2'].value,
      phoneReference3: this.referenceForm.controls['phone2'].value,
    }]
    console.log(params,'referencia')

    this.auth.driverReference(params)
      .then(res => {
        console.log(JSON.stringify(res))
        this.alert.showAlert('Datos Bancarios','Se ha guardado correctamente')
        this.navCtrl.setRoot('home-drive')



      })
      .catch(error => {
        console.log(error)
        this.alert.showAlert('Error','Ocurrio un error, intente de nuevo')
      })

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
