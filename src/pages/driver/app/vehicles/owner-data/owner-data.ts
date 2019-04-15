import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@IonicPage()
@Component({
  selector: 'owner-data',
  templateUrl: 'owner-data.html'
})
export class OwnerDataVehiclesDriverPage {

  ownerForm: FormGroup
  ownerForm0: FormGroup

  owner: any
  step_form: number = 0
  step_images: any = [
    './assets/imgs/step-1-2.png',
    './assets/imgs/step-2-2.png'
  ]
  step_img: string = this.step_images[0]
  btn_txt: string

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {


    this.setForm()
    //Form 0


  }

  setForm() {
    this.ownerForm = this.formBuilder.group({
      type: ['', Validators.compose([
        Validators.minLength(3)])],
      id_type: ['', Validators.compose([
        Validators.minLength(3)])],
      id: ['', Validators.compose([
        Validators.minLength(3)])],
      first_name: ['', Validators.compose([
        Validators.minLength(3)])],
      second_name: ['', Validators.compose([
        Validators.minLength(3)])],
      first_lastname: ['', Validators.compose([
        Validators.minLength(3)])],
      second_lastname: ['', Validators.compose([
        Validators.minLength(3)])],
      state: ['', Validators.compose([
        Validators.minLength(3)])],
      address: ['', Validators.compose([
        Validators.minLength(3)])],
      mobil: ['', Validators.compose([
        Validators.minLength(3)])],
      phone: ['', Validators.compose([
        Validators.minLength(3)])]
    })


    this.ownerForm0 = this.formBuilder.group({
      owner_business_name: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_nit: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_country: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_department: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_municipality: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_address: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_mobile: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_phone: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_first_name_legal_rep: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_second_name_legal_rep: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_surname_legal_rep: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_second_surname_legal_rep: ['', Validators.compose([
        Validators.minLength(3)])],

      owner_email_legal_rep: ['', Validators.compose([
        Validators.minLength(3)])]
    })

  }

  ionViewDidLoad() {
    this.getBtnText()
  }

  getBtnText() {
    // this.step_form === 0 ? this.btn_txt = 'Guardar Y Continuar' : this.btn_txt = 'Guardar'
    this.btn_txt = 'Guardar'
  }

  save() {
    if (this.step_form === 0) {
      console.log('-OwnerData- StepForm 0')
      const loader = this.loadingCtrl.create({})
      loader.present()


    } else if (this.step_form === 1) {
      console.log('-OwnerData- StepForm 1')

    }
  }


 

}
