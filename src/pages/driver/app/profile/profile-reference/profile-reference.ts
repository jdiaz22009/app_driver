import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { StorageDb } from '@providers/storageDb'

@IonicPage()
@Component({
  selector: 'profile-reference-driver',
  templateUrl: 'profile-reference.html'
})
export class ProfileReferenceDriverPage {

  referenceForm: FormGroup

  email_validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  id_validator = /^\d+$/

  constructor(
    public navCtrl: NavController,
    public db: StorageDb,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {

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


  save(){

  }

  toCapitalize(v, property){
    let value
    if(typeof(v) === 'string'){
      value = v.charAt(0).toUpperCase() + v.slice(1)
    }else if(typeof(v) === 'object'){
      value = v._value.toString().charAt(0).toUpperCase() + v._value.toString().slice(1)
    }
    if(this.referenceForm.controls[property] !== undefined){
      this.referenceForm.controls[property].setValue(value)
    }
  }


}
