import { Component, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { DriverAuthProvider } from '@providers/api/driverAuth'

@IonicPage()
@Component({
  selector: 'profile-additional-driver',
  templateUrl: 'profile-additional.html'
})
export class ProfileAdditionalDriverPage {

  @ViewChild(Content) content: Content

  profileForm: FormGroup
  profileForm_0: FormGroup

  profile: any
  step_form: number = 0
  step_images: any = [
    './assets/imgs/step-1-2.png',
    './assets/imgs/step-2-2.png'
  ]
  step_img: string = this.step_images[0]


  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public auth: DriverAuthProvider,
    public navParams: NavParams) {

      this.setForms()
  }

  ionViewDidLoad(){

  }

  setForms(){
    this.profileForm = this.formBuilder.group({
      date: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      place: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      country: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      state: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      address: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])]
     })


     this.profileForm_0 = this.formBuilder.group({
      date: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      place: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      arl: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      eps: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      license_plate: ['', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ])],
      license_category: ['', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])],
      license_expiration: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      rh: ['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      gender: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])]
     })
  }

  save(){
    if(this.step_form === 0){
      this.step_form ++
      this.step_img = this.step_images[1]
      this.scrollToTop()
    }else if(this.step_form === 1){

    }
  }

  scrollToTop() {
    this.content.scrollToTop()
  }

}
