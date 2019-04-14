import { Component, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Cart } from '@models/cart'
import { AlertsProvider } from '@providers/alerts'
import { CartProvider } from '@providers/api/cart'

@IonicPage()
@Component({
  selector: 'additional-information',
  templateUrl: 'additional-information.html'
})
export class AdditionalInfoVehiclesDriverPage {

  cart = {} as Cart
  cartForm: FormGroup
  @ViewChild(Content) content: Content

  step_form: number = 0
  step_images: any = [
    './assets/imgs/step-1-3.png',
    './assets/imgs/step-2-3.png',
    './assets/imgs/step-3-3.png'
  ]
  step_img: string = this.step_images[0]

  btn_title: string = ' Guardar y Continuar'

  vehicleForm: FormGroup
  vehicleForm0: FormGroup
  vehicleForm1: FormGroup

  gas_category: any = [
    { value: 'Diesel', name: 'Diesel' },
    { value: 'ACPM', name: 'ACPM' },
    { value: 'Gas Natural', name: 'Gas Natural' },
    { value: 'Gasolina', name: 'Gasolina' },
    { value: 'Electrico', name: 'Electrico' }
  ]

  configuration_category: any = [
    { value: 'Camión Rígido De 2 Ejes', name: 'Camión Rígido De 2 Ejes' },
    { value: 'Camión Rígido De 3 Ejes', name: 'Camión Rígido De 3 Ejes' },
    { value: 'Camión Rígido De 4 Ejes', name: 'Camión Rígido De 4 Ejes' },
    { value: 'Camión De Mas De 4 Ejes', name: 'Camión De Mas De 4 Ejes' },
    { value: 'Tractocamión De 2 Ejes', name: 'Tractocamión De 2 Ejes' },
    { value: 'Tractocamión De 3 Ejes', name: 'Tractocamión De 3 Ejes' },
    { value: 'Tractocamión De 4 Ejes', name: 'Tractocamión De 4 Ejes' },
    { value: 'Tractocamión De Mas De 4 Ejes', name: 'Tractocamión De Mas De 4 Ejes' }

  ]

  service_type_category: any = [
    { value: 'Particular', name: 'Particular' },
    { value: 'Público', name: 'Público' }
  ]

  country_category: any = [
    { value: 'Colombia', name: 'Colombia' }
  ]
  vehicle: any
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public cartApi: CartProvider,
    public alert: AlertsProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

    this.vehicle = navParams.get('vehicle')
    console.log('-AdditionalInformationVehicle- vehicle: ', this.vehicle)



    this.setForm()
    // Form 0
    this.vehicleForm.controls['engine'].setValue(this.vehicle.motor)
    // Repotenciado
    this.vehicleForm.controls['chassis'].setValue(this.vehicle.chasis)
    this.vehicleForm.controls['gas'].setValue(this.vehicle.combustible)
    this.vehicleForm.controls['configuration'].setValue(this.vehicle.configuracion)
    this.vehicleForm.controls['color'].setValue(this.vehicle.color)
    this.vehicleForm.controls['weight'].setValue(this.vehicle.peso_vacio)
    this.vehicleForm.controls['capacity'].setValue(this.vehicle.capacidad)
    this.vehicleForm.controls['service_type'].setValue(this.vehicle.tipo_servicio)
    this.vehicleForm.controls['country'].setValue(this.vehicle.pais)

    // Form 1
    this.vehicleForm0.controls['import_declaration'].setValue(this.vehicle.importacion)
    this.vehicleForm0.controls['soat'].setValue(this.vehicle.numero_soat)
    this.vehicleForm0.controls['soat_expiration'].setValue(this.vehicle.vencimiento_soat)
    this.vehicleForm0.controls['soat_company_id'].setValue(this.vehicle.nit_soat)
    this.vehicleForm0.controls['technical_review'].setValue(this.vehicle.numero_tecnicomecanica)
    this.vehicleForm0.controls['technical_review_expiration'].setValue(this.vehicle.vencimiento_tecnicomecanica)
    // this.vehicleForm0.controls['technical_review_expiration'].setValue(this.vehicle.tipo_servicio)

    // Form 2
    this.vehicleForm1.controls['gps_company'].setValue(this.vehicle.empresa_gps)
    this.vehicleForm1.controls['gps_company_web'].setValue(this.vehicle.pagina_gps)
    this.vehicleForm1.controls['gps_id'].setValue(this.vehicle.id_gps)
    this.vehicleForm1.controls['gps_user'].setValue(this.vehicle.usuario_gps)
    this.vehicleForm1.controls['gps_password'].setValue(this.vehicle.clave_gps)

  }

  setForm() {
    this.vehicleForm = this.formBuilder.group({
      engine: ['', Validators.compose([
        Validators.minLength(3),
        // Validators.required
      ])],
      repowering: ['', Validators.compose([
        // Validators.required
      ])],
      chassis: ['', Validators.compose([
        Validators.minLength(3),
        // Validators.required
      ])],
      gas: ['', Validators.compose([
        Validators.minLength(1),
        // Validators.required
      ])],
      configuration: ['', Validators.compose([
        Validators.minLength(1),
        // Validators.required
      ])],
      color: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      weight: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      capacity: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      service_type: ['', Validators.compose([
        Validators.minLength(1),
        // Validators.required
      ])],
      country: ['', Validators.compose([
        Validators.minLength(1),
        // Validators.required
      ])]




    })


    this.vehicleForm0 = this.formBuilder.group({
      import_declaration: ['', Validators.compose([
        Validators.minLength(6),
        // Validators.required
      ])],
      soat: ['', Validators.compose([
        Validators.minLength(3),
        // Validators.required
      ])],
      soat_expiration: ['', Validators.compose([
        Validators.minLength(3),
        // Validators.required
      ])],
      soat_company_id: ['', Validators.compose([
        Validators.minLength(3),
        // Validators.required
      ])],
      technical_review: ['', Validators.compose([
        Validators.minLength(3),
        // Validators.required
      ])],
      technical_review_expiration: ['', Validators.compose([
        Validators.minLength(3),
        // Validators.required
      ])],
      trailer: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      trailer_brand: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      trailer_model: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      trailer_plate: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])]
    })

    this.vehicleForm1 = this.formBuilder.group({
      gps_company: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      gps_company_web: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      gps_id: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      gps_user: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])],
      gps_password: ['', Validators.compose([
        Validators.minLength(2),
        // Validators.required
      ])]
    })
  }

  save() {

    if (this.step_form === 0) {
      console.log('-AditionalInfo- StepForm 0')
      if (this.vehicleForm.controls['engine'].value !== this.vehicle.motor ||
        this.vehicleForm.controls['chassis'].value !== this.vehicle.chasis ||
        this.vehicleForm.controls['gas'].value !== this.vehicle.combustible ||
        this.vehicleForm.controls['configuration'].value !== this.vehicle.configuracion ||
        this.vehicleForm.controls['color'].value !== this.vehicle.color ||
        this.vehicleForm.controls['weight'].value !== this.vehicle.peso_vacio ||
        this.vehicleForm.controls['capacity'].value !== this.vehicle.capacidad ||
        this.vehicleForm.controls['service_type'].value !== this.vehicle.tipo_servicio ||
        this.vehicleForm.controls['country'].value !== this.vehicle.pais
      ) {
        const loader = this.loadingCtrl.create({})
        loader.present()

        this.cart.engine = this.vehicleForm.controls['engine'].value
        this.cart.chassis = this.vehicleForm.controls['chassis'].value
        this.cart.gas = this.vehicleForm.controls['gas'].value
        this.cart.configuration = this.vehicleForm.controls['configuration'].value
        this.cart.color = this.vehicleForm.controls['color'].value
        this.cart.weight = this.vehicleForm.controls['weight'].value
        this.cart.capacity = this.vehicleForm.controls['capacity'].value
        this.cart.service_type = this.vehicleForm.controls['service_type'].value
        this.cart.country = this.vehicleForm.controls['country'].value

        console.log('-AditionalInfo- cart: ', this.cart)
        console.log('-AditionalInfo- _idVehicle: ', this.vehicle._id)


        this.cartApi.updateVehicleAddInfo1(this.cart, this.vehicle._id).then(res => {
          console.log(JSON.stringify(res))
          // this.navCtrl.pop()
          loader.dismiss()
          this.alert.showAlert('Vehículo Actualizado', 'Se ha actualizado tu vehículo correctamente')
        }).catch(e => {
          console.error(e)
          loader.dismiss()
          this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tu vehículo, intenta de nuevo.')
        })
      }
      this.step_form++
      this.step_img = this.step_images[1]
      this.scrollToTop()
    } else if (this.step_form === 1) {
      console.log('-AditionalInfo- StepForm 1')
      if (
        this.vehicleForm0.controls['import_declaration'].value !== this.vehicle.importacion ||
        this.vehicleForm0.controls['soat'].value !== this.vehicle.numero_soat ||
        this.vehicleForm0.controls['soat_expiration'].value !== this.vehicle.vencimiento_soat ||
        this.vehicleForm0.controls['soat_company_id'].value !== this.vehicle.nit_soat ||
        this.vehicleForm0.controls['technical_review'].value !== this.vehicle.numero_tecnicomecanica ||
        this.vehicleForm0.controls['technical_review_expiration'].value !== this.vehicle.vencimiento_tecnicomecanica
        // || this.cart.technical_review_expiration !== this.vehicle.trailer 

      ) {
        const loader = this.loadingCtrl.create({})
        loader.present()

        this.cart.import_declaration = this.vehicleForm0.controls['import_declaration'].value
        this.cart.soat = this.vehicleForm0.controls['soat'].value
        this.cart.soat_expiration = this.vehicleForm0.controls['soat_expiration'].value
        this.cart.soat_company_id = this.vehicleForm0.controls['soat_company_id'].value
        this.cart.technical_review = this.vehicleForm0.controls['technical_review'].value
        this.cart.technical_review_expiration = this.vehicleForm0.controls['technical_review_expiration'].value
        // // this.cart.trailer = this.vehicleForm.controls['trailer'].value


        console.log('-AditionalInfo- cart: ', this.cart)
        console.log('-AditionalInfo- _idVehicle: ', this.vehicle._id)


        this.cartApi.updateVehicleAddInfo2(this.cart, this.vehicle._id).then(res => {
          console.log(JSON.stringify(res))
          // this.navCtrl.pop()
          loader.dismiss()
          this.alert.showAlert('Vehículo Actualizado', 'Se ha actualizado tu vehículo correctamente')
        }).catch(e => {
          console.error(e)
          loader.dismiss()
          this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tu vehículo, intenta de nuevo.')
        })
      }



      this.step_form++
      this.step_img = this.step_images[2]
      this.scrollToTop()
    } else if (this.step_form === 2) {
      console.log('-AditionalInfo- StepForm 2')
      if (
        this.vehicleForm1.controls['gps_company'].value !== this.vehicle.empresa_gps ||
        this.vehicleForm1.controls['gps_company_web'].value !== this.vehicle.pagina_gps ||
        this.vehicleForm1.controls['gps_id'].value !== this.vehicle.id_gps ||
        this.vehicleForm1.controls['gps_user'].value !== this.vehicle.usuario_gps ||
        this.vehicleForm1.controls['gps_password'].value !== this.vehicle.clave_gps

      ) {
        const loader = this.loadingCtrl.create({})
        loader.present()

        this.cart.gps_company = this.vehicleForm1.controls['gps_company'].value
        this.cart.gps_company_web = this.vehicleForm1.controls['gps_company_web'].value
        this.cart.gps_id = this.vehicleForm1.controls['gps_id'].value
        this.cart.gps_user = this.vehicleForm1.controls['gps_user'].value
        this.cart.gps_user = this.vehicleForm1.controls['gps_user'].value
        this.cart.gps_password = this.vehicleForm1.controls['gps_password'].value


        console.log('-AditionalInfo- cart: ', this.cart)
        console.log('-AditionalInfo- _idVehicle: ', this.vehicle._id)


        this.cartApi.updateVehicleAddInfo3(this.cart, this.vehicle._id).then(res => {
          console.log(JSON.stringify(res))
          this.navCtrl.pop()
          loader.dismiss()
          this.alert.showAlert('Vehículo Actualizado', 'Se ha actualizado tu vehículo correctamente')
        }).catch(e => {
          console.error(e)
          loader.dismiss()
          this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tu vehículo, intenta de nuevo.')
        })
      }
      this.navCtrl.pop()


    }
  }

  scrollToTop() {
    this.content.scrollToTop()
  }

  toCapitalize(v, property) {
    let value
    if (typeof (v) === 'string') {
      value = v.charAt(0).toUpperCase() + v.slice(1)
    } else if (typeof (v) === 'object') {
      value = v._value.toString().charAt(0).toUpperCase() + v._value.toString().slice(1)
    }
    if (this.vehicleForm.controls[property] !== undefined) {
      this.vehicleForm.controls[property].setValue(value)
    }
  }

}
