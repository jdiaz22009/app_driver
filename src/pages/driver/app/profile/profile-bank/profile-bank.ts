import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@IonicPage()
@Component({
  selector: 'profile-bank-driver',
  templateUrl: 'profile-bank.html'
})
export class ProfileBankDriverPage {

  bankForm: FormGroup

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {


      this.bankForm = this.formBuilder.group({
        phone: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])],
        bank: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])],
        account: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])],
        name: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])],
        id: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])],
        account_type: ['', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])]
       })


  }

  ionViewDidLoad(){

  }


}
