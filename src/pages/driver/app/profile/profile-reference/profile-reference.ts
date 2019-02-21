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


  }

  ionViewDidLoad(){

  }


}
