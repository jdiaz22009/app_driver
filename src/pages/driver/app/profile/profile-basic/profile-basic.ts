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

  updateForm: FormGroup
  obj: object = {}
  userUpdate = {} as RegisterDriver

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: DriverAuthProvider,
    private formBuilder: FormBuilder) {

      this.updateForm = this.formBuilder.group({
        primer_nombre:'',
        segundo_nombre:'',
        primer_apellido:'',
        segundo_apellido:'',
        celular:'',
       })


  }

  ionViewDidLoad(){
    this.getDriverProfile()
  }

  getDriverProfile(){
    this.auth.getDriver().then(res => {
      const data = res['data']
      console.log(JSON.stringify(data))
    })
    .catch(e => {console.error(e)})

  }

  async update(){

    this.userUpdate.first_name = this.updateForm.controls['primer_nombre'].value
    this.userUpdate.second_name = this.updateForm.controls['segundo_nombre'].value
    this.userUpdate.first_lastname = this.updateForm.controls['primer_apellido'].value
    this.userUpdate.second_lastname = this.updateForm.controls['segundo_apellido'].value
    this.userUpdate.mobil = this.updateForm.controls['celular'].value

    this.auth.upatedrivers(this.userUpdate).then(res=> {
      const data = res
      console.log(data)
    })
    .catch(e => console.error(e))

  }

}
