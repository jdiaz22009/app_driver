import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { AlertsProvider } from '@providers/alerts'



@IonicPage()
@Component({
  selector: 'profile-bank-driver',
  templateUrl: 'profile-bank.html'
})
export class ProfileBankDriverPage {

  bankForm: FormGroup
  checknequi: boolean;
  checkbank: boolean;
  disablenequi: boolean;
  disableTel: boolean;
  profile_bank:any = {}

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public auth: DriverAuthProvider,
    public alert: AlertsProvider,
    ) {


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

  ionViewDidLoad() {
    console.log('borra es come maricas')
  }


  checkselect() {
    if (this.checknequi == true && this.checkbank == true) {
      this.disablenequi = true
      this.disableTel = true
    } else if (this.checkbank == true) {
      this.disablenequi = false
      this.disableTel = false
    } else if (this.checknequi == true) {
      this.disablenequi = true
      this.disableTel = false
    } else {
      this.disablenequi = true
      this.disableTel = true
    }
    console.log('save', this.checknequi, this.checkbank)
  }


  saveBank(){

    if (this.checknequi == true) {
      this.profile_bank.phone = this.bankForm.controls['phone'].value
      this.profile_bank.type = 1
      this.auth.bankData(this.profile_bank)
      .then(res => {
        console.log(JSON.stringify(res))
        this.alert.showAlert('Datos nequi','Se ha guardado correctamente')
        this.navCtrl.setRoot('home-drive')


      })
      .catch(error => {
        console.log(error)
        this.alert.showAlert('Error','Ocurrio un error, intente de nuevo')
      })
      console.log(this.profile_bank)


      
    }else if (this.checkbank == true) {
      this.profile_bank.phone = this.bankForm.controls['phone'].value
      this.profile_bank.bank = this.bankForm.controls['bank'].value
      this.profile_bank.account = this.bankForm.controls['account'].value
      this.profile_bank.name = this.bankForm.controls['name'].value
      this.profile_bank.phone = this.bankForm.controls['phone'].value
      this.profile_bank.id = this.bankForm.controls['id'].value
      this.profile_bank.account_type = this.bankForm.controls['account_type'].value
      this.profile_bank.type = 2

      this.auth.bankData(this.profile_bank)
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

  }


}
