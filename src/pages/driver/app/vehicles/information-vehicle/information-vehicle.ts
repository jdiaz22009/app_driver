import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DriverAuthProvider } from "@providers/api/driverAuth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RegisterDriver } from '@models/registerDriver'


@IonicPage()
@Component({
  selector: 'information-vehicle',
  templateUrl: 'information-vehicle.html'
})
export class InformationVehiclesDriverPage {
  
  updateForm:FormGroup;
  document: String = 'final'
  obj: object={};
  userUpdate={} as RegisterDriver;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public driverAuthProvider: DriverAuthProvider,
    private formBuilder: FormBuilder) {

      this.updateForm = this.formBuilder.group({
        primer_nombre:'',
        segundo_nombre:'',
        primer_apellido:'',
        segundo_apellido:'',
        celular:'',
       });     


  }

  ionViewDidLoad(){
    this.getperfilConductor();
  }

  getperfilConductor(){
    this.driverAuthProvider.getDriver()
    .then(resp => {
      //const drive = resp['data'];
      const data = resp['data'];
      console.log('=========data',data)
      //this.document = data['id_driver']['documento'];
      //this.obj=data['id_driver'];
      this.obj=data;
      console.log('lllll',this.obj);
      //return  this.obj; console.log('drivers', drive);
      return  this.obj;
    })
    .catch(error => {console.log(error)});

  }

  async update(){
    this.userUpdate.first_name = this.updateForm.controls['primer_nombre'].value
    this.userUpdate.second_name = this.updateForm.controls['segundo_nombre'].value
    this.userUpdate.first_lastname = this.updateForm.controls['primer_apellido'].value
    this.userUpdate.second_lastname = this.updateForm.controls['segundo_apellido'].value
    this.userUpdate.mobil = this.updateForm.controls['celular'].value

    console.log(this.userUpdate,'hp');
    this.driverAuthProvider.upatedrivers(this.userUpdate)
    .then(resp => {
      const data = resp;
      console.log(data);

    })
    .catch(error => console.log('error'))
    
  }

}
