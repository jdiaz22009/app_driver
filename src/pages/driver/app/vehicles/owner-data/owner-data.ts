import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Cart } from '@models/cart'
import { AlertsProvider } from '@providers/alerts'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { CartProvider } from '@providers/api/cart'


@IonicPage()
@Component({
  selector: 'owner-data',
  templateUrl: 'owner-data.html'
})
export class OwnerDataVehiclesDriverPage {

  ownerForm: FormGroup
  ownerForm0: FormGroup

  cart = {} as Cart
  vehicle: any
  owner: any
  userData: any = []

  step_form: number = 0
  is_owner: number = 1
  disableowner: boolean = false


  step_images: any = [
    './assets/imgs/step-1-2.png',
    './assets/imgs/step-2-2.png'
  ]
  step_img: string = this.step_images[0]
  btn_txt: string



  show_type: number = 0

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    public auth: DriverAuthProvider,
    public cartApi: CartProvider,
    public alert: AlertsProvider,
    public loadingCtrl: LoadingController) {


    this.vehicle = navParams.get('vehicle')
    console.log('-AdditionalInformationVehicle- vehicle: ', this.vehicle)
    this.setForm()
    this.ownerForm.controls['owner_yes'].setValue(false)
    this.ownerForm.controls['owner_no'].setValue(false)
    this.ownerForm.controls['owner_prop_yes'].setValue(false)
    this.ownerForm.controls['owner_prop_yes'].setValue(false)


    if (this.vehicle.propietario === 'Si') {
      console.log('-AdditionalInformationVehicle- Entro a es propietario')
      this.ownerForm.controls['owner_yes'].setValue(true)
      this.ownerForm.controls['owner_no'].setValue(false)
      this.is_owner = 1
      this.disableowner = true
      this.ownerForm.controls['owner_type'].setValue('Natural')
      this.ownerForm.controls['owner_id_type'].setValue('CC')
      this.ownerForm.controls['owner_id'].setValue(this.userData.documento)
      this.ownerForm.controls['owner_first_name'].setValue(this.userData.primer_nombre)
      this.ownerForm.controls['owner_second_name'].setValue(this.userData.segundo_nombre)
      this.ownerForm.controls['owner_first_lastname'].setValue(this.userData.primer_apellido)
      this.ownerForm.controls['owner_second_lastname'].setValue(this.userData.segundo_apellido)
      this.ownerForm.controls['owner_state'].setValue(this.userData.ciudad)
      this.ownerForm.controls['owner_address'].setValue(this.userData.direccion)
      this.ownerForm.controls['owner_mobil'].setValue(this.userData.celular)
      this.ownerForm.controls['owner_phone'].setValue(this.userData.telefono_1)

    } else if (this.vehicle.propietario === 'No') {
      this.ownerForm.controls['owner_yes'].setValue(false)
      this.ownerForm.controls['owner_no'].setValue(true)
      this.is_owner = 0
      this.disableowner = false
      if (this.vehicle.tendor === 'Si') {
        this.ownerForm.controls['owner_prop_yes'].setValue(false)
        this.ownerForm.controls['owner_prop_no'].setValue(true)
      } else if (this.vehicle.tendor === 'No') {
        this.ownerForm.controls['owner_prop_yes'].setValue(true)
        this.ownerForm.controls['owner_prop_no'].setValue(false)
      }
      if (this.vehicle.prop_tipo_persona === 'natural' || this.vehicle.prop_tipo_persona === 'juridica') {
        if (this.vehicle.prop_tipo_persona === 'natural') {
          this.ownerForm.controls['owner_type'].setValue(this.vehicle.prop_tipo_persona)
          this.show_type = 0
          this.ownerForm.controls['owner_id_type'].setValue(this.vehicle.prop_tipo_identificacion)
          this.ownerForm.controls['owner_id'].setValue(this.vehicle.prop_identificacion)
          this.ownerForm.controls['owner_first_name'].setValue(this.vehicle.prop_primer_nombre)
          this.ownerForm.controls['owner_second_name'].setValue(this.vehicle.prop_segundo_nombre)
          this.ownerForm.controls['owner_first_lastname'].setValue(this.vehicle.prop_primer_apellido)
          this.ownerForm.controls['owner_second_lastname'].setValue(this.vehicle.prop_segundo_apellido)
          this.ownerForm.controls['owner_state'].setValue(this.vehicle.prop_municipio)
          this.ownerForm.controls['owner_address'].setValue(this.vehicle.prop_direccion)
          this.ownerForm.controls['owner_mobil'].setValue(this.vehicle.prop_celular)
          this.ownerForm.controls['owner_phone'].setValue(this.vehicle.prop_telefono)
        } else if (this.vehicle.prop_tipo_persona === 'juridica') {
          this.ownerForm.controls['owner_type'].setValue(this.vehicle.prop_tipo_persona)
          this.show_type = 1
          this.ownerForm.controls['owner_business_name'].setValue(this.vehicle.prop_razon_social)
          this.ownerForm.controls['owner_nit'].setValue(this.vehicle.prop_nit)
          this.ownerForm.controls['owner_country'].setValue(this.vehicle.prop_pais)
          this.ownerForm.controls['owner_department'].setValue(this.vehicle.prop_departamento)
          this.ownerForm.controls['owner_municipality'].setValue(this.vehicle.prop_municipio_negocio)
          this.ownerForm.controls['owner_address'].setValue(this.vehicle.prop_direccion_negocio)
          this.ownerForm.controls['owner_mobile'].setValue(this.vehicle.prop_tipo_persona)
          this.ownerForm.controls['owner_phone'].setValue(this.vehicle.prop_telefono_negocio)
          this.ownerForm.controls['owner_first_name_legal_rep'].setValue(this.vehicle.prop_repre_primer_nombre)
          this.ownerForm.controls['owner_second_name_legal_rep'].setValue(this.vehicle.prop_repre_segundo_nombre)
          this.ownerForm.controls['owner_surname_legal_rep'].setValue(this.vehicle.prop_repre_primer_apellido)
          this.ownerForm.controls['owner_second_surname_legal_rep'].setValue(this.vehicle.prop_repre_segundo_apellido)
          this.ownerForm.controls['owner_email_legal_rep'].setValue(this.vehicle.prop_repre_email)

        }
      }
    } else {
      this.ownerForm.controls['owner_yes'].setValue(false)
      this.ownerForm.controls['owner_no'].setValue(false)
      this.ownerForm.controls['owner_prop_yes'].setValue(false)
      this.ownerForm.controls['owner_prop_yes'].setValue(false)
      this.is_owner = 1
    }
  }

  setForm() {
    this.ownerForm = this.formBuilder.group({
      owner_yes: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_no: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_prop_yes: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_prop_no: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_type: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_id_type: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_id: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_first_name: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_second_name: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_first_lastname: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_second_lastname: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_state: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_address: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_mobil: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_phone: ['', Validators.compose([
        Validators.minLength(0)])]
    })


    this.ownerForm0 = this.formBuilder.group({
      owner_business_name: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_nit: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_country: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_department: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_municipality: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_address: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_mobile: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_phone: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_first_name_legal_rep: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_second_name_legal_rep: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_surname_legal_rep: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_second_surname_legal_rep: ['', Validators.compose([
        Validators.minLength(0)])],

      owner_email_legal_rep: ['', Validators.compose([
        Validators.minLength(0)])]
    })

  }

  ionViewDidLoad() {
    this.getBtnText()
    this.getProfile()
  }

  getProfile() {
    this.auth.getDriver().then(res => {
      console.log('user ' + JSON.stringify(res))
      this.userData = res['data'].id_driver
    })
  }

  getBtnText() {
    // this.step_form === 0 ? this.btn_txt = 'Guardar Y Continuar' : this.btn_txt = 'Guardar'
    this.btn_txt = 'Guardar'
  }

  save() {
    const loader = this.loadingCtrl.create({})
    loader.present()
    this.cart.owner_type = this.ownerForm.controls['owner_type'].value

    if (this.show_type === 0) {
      console.log('-OwnerData- StepForm 0')
      this.cart.owner_id_type = this.ownerForm.controls['owner_id_type'].value
      this.cart.owner_id = this.ownerForm.controls['owner_id'].value
      this.cart.owner_first_name = this.ownerForm.controls['owner_first_name'].value
      this.cart.owner_second_name = this.ownerForm.controls['owner_second_name'].value
      this.cart.owner_first_lastname = this.ownerForm.controls['owner_first_lastname'].value
      this.cart.owner_second_lastname = this.ownerForm.controls['owner_second_lastname'].value
      this.cart.owner_state = this.ownerForm.controls['owner_state'].value
      this.cart.owner_address = this.ownerForm.controls['owner_address'].value
      this.cart.owner_mobil = this.ownerForm.controls['owner_mobil'].value
      this.cart.owner_phone = this.ownerForm.controls['owner_phone'].value

      console.log('--OwnerData-- Cart: ', this.cart)
      console.log('--OwnerData-- vehicle: ', this.vehicle)

      this.cartApi.updateVehicleAddOwnerNat(this.cart, this.vehicle._id).then(res => {
        console.log('--OwnerData-- RESPUESTA: ', JSON.stringify(res))
        loader.dismiss()
        this.navCtrl.pop()

        this.alert.showAlert('Información Actualizado', 'Se ha actualizado tu vehículo correctamente')
      }).catch(e => {
        console.error(e)
        loader.dismiss()
        this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tu vehículo, intenta de nuevo.')
      })

    } else if (this.show_type === 1) {
      console.log('-OwnerData- StepForm 1')
      this.cart.owner_business_name = this.ownerForm.controls['owner_business_name'].value
      this.cart.owner_nit = this.ownerForm.controls['owner_nit'].value
      this.cart.owner_country = this.ownerForm.controls['owner_country'].value
      this.cart.owner_department = this.ownerForm.controls['owner_department'].value
      this.cart.owner_municipality = this.ownerForm.controls['owner_municipality'].value
      this.cart.owner_address = this.ownerForm.controls['owner_address'].value
      this.cart.owner_mobile = this.ownerForm.controls['owner_mobile'].value
      this.cart.owner_phone = this.ownerForm.controls['owner_phone'].value
      this.cart.owner_first_name_legal_rep = this.ownerForm.controls['owner_first_name_legal_rep'].value
      this.cart.owner_second_name_legal_rep = this.ownerForm.controls['owner_second_name_legal_rep'].value
      this.cart.owner_surname_legal_rep = this.ownerForm.controls['owner_surname_legal_rep'].value
      this.cart.owner_second_surname_legal_rep = this.ownerForm.controls['owner_second_surname_legal_rep'].value
      this.cart.owner_email_legal_rep = this.ownerForm.controls['owner_email_legal_rep'].value

      console.log('--OwnerData-- Cart: ', this.cart)
      console.log('--OwnerData-- vehicle: ', this.vehicle)

      this.cartApi.updateVehicleAddOwnerJur(this.cart, this.vehicle._id).then(res => {
        console.log(JSON.stringify(res))
        loader.dismiss()
        this.navCtrl.pop()

        this.alert.showAlert('Información Actualizado', 'Se ha actualizado tu vehículo correctamente')
      }).catch(e => {
        console.error(e)
        loader.dismiss()
        this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tu vehículo, intenta de nuevo.')
      })

    }



  }

  onType(event) {
    console.log('--OwnerData-- onType event: ', event)
    console.log('--OwnerData-- OwnerForm: ', this.ownerForm.controls['owner_type'].value)

    if (event === 'natural') {
      this.show_type = 0
    } else if (event === 'juridica') {
      this.show_type = 1
    }
  }

  ckOwnerYes() {
    if (this.ownerForm.controls['owner_yes'].value === true) {
      this.ownerForm.controls['owner_no'].setValue(false)
      this.is_owner = 1
      this.disableowner = true
      this.cart.owner = 'Si'
      this.ownerForm.controls['owner_type'].setValue('natural')
      this.ownerForm.controls['owner_id_type'].setValue('CC')
      this.ownerForm.controls['owner_id'].setValue(this.userData.documento)
      this.ownerForm.controls['owner_first_name'].setValue(this.userData.primer_nombre)
      this.ownerForm.controls['owner_second_name'].setValue(this.userData.segundo_nombre)
      this.ownerForm.controls['owner_first_lastname'].setValue(this.userData.primer_apellido)
      this.ownerForm.controls['owner_second_lastname'].setValue(this.userData.segundo_apellido)
      this.ownerForm.controls['owner_state'].setValue(this.userData.ciudad)
      this.ownerForm.controls['owner_address'].setValue(this.userData.direccion)
      this.ownerForm.controls['owner_mobil'].setValue(this.userData.celular)
      this.ownerForm.controls['owner_phone'].setValue(this.userData.telefono_1)
    } else if (this.ownerForm.controls['owner_yes'].value === false) {
      this.is_owner = 1
      this.disableowner = false
      this.cart.owner = ''
      this.ownerForm.controls['owner_type'].setValue('')
      this.ownerForm.controls['owner_id_type'].setValue('')
      this.ownerForm.controls['owner_id'].setValue('')
      this.ownerForm.controls['owner_first_name'].setValue('')
      this.ownerForm.controls['owner_second_name'].setValue('')
      this.ownerForm.controls['owner_first_lastname'].setValue('')
      this.ownerForm.controls['owner_second_lastname'].setValue('')
      this.ownerForm.controls['owner_state'].setValue('')
      this.ownerForm.controls['owner_address'].setValue('')
      this.ownerForm.controls['owner_mobil'].setValue('')
      this.ownerForm.controls['owner_phone'].setValue('')
    }
  }

  ckOwnerNo() {
    if (this.ownerForm.controls['owner_no'].value === true) {
      this.ownerForm.controls['owner_yes'].setValue(false)
      this.is_owner = 0
      this.ownerForm.controls['owner_prop_yes'].setValue(false)
      this.ownerForm.controls['owner_prop_no'].setValue(false)
      this.disableowner = false
      this.cart.owner = 'No'
      this.ownerForm.controls['owner_type'].setValue('')
      this.ownerForm.controls['owner_id_type'].setValue('')
      this.ownerForm.controls['owner_id'].setValue('')
      this.ownerForm.controls['owner_first_name'].setValue('')
      this.ownerForm.controls['owner_second_name'].setValue('')
      this.ownerForm.controls['owner_first_lastname'].setValue('')
      this.ownerForm.controls['owner_second_lastname'].setValue('')
      this.ownerForm.controls['owner_state'].setValue('')
      this.ownerForm.controls['owner_address'].setValue('')
      this.ownerForm.controls['owner_mobil'].setValue('')
      this.ownerForm.controls['owner_phone'].setValue('')
    } else if (this.ownerForm.controls['owner_no'].value === false) {
      this.is_owner = 1
      this.cart.owner = ''
    }
  }

  ckOwnerProYes() {
    if (this.ownerForm.controls['owner_prop_yes'].value === true) {
      this.ownerForm.controls['owner_prop_no'].setValue(false)
      this.cart.fork_info = 'No'
    } else if (this.ownerForm.controls['owner_prop_yes'].value === false) {
      this.cart.fork_info = ''
    }
  }

  ckOwnerProNo() {
    if (this.ownerForm.controls['owner_prop_no'].value === true) {
      this.ownerForm.controls['owner_prop_yes'].setValue(false)
      this.cart.fork_info = 'Si'
    } else if (this.ownerForm.controls['owner_prop_no'].value === false) {
      this.cart.fork_info = ''
    }
  }




}
