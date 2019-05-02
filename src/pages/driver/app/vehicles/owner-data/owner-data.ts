import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, ModalController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Cart } from '@models/cart'

import { AlertsProvider } from '@providers/alerts'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { CartProvider } from '@providers/api/cart'
import { CitiesProvider } from '@providers/cities'
import { FirebaseProvider } from '@providers/firebase'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'
import { MediaProvider } from '@providers/media'
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
  step_images: any = [
    './assets/imgs/step-1-2.png',
    './assets/imgs/step-2-2.png'
  ]
  departmentsOptions: any = []
  citiesOptions: any = []

  picturesObj = [
    {name: 'holderLetter'}
  ]

  step_form: number = 0
  is_owner: number = 1
  show_type: number = 0
  pictureMode: number = 4

  disableowner: boolean = false
  showImageLetter: boolean = false

  step_img: string = this.step_images[0]
  btn_txt: string = 'Guardar'
  noImg: string = './assets/imgs/no_photo.png'
  holderLetter: string = this.noImg

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    public auth: DriverAuthProvider,
    public cartApi: CartProvider,
    public alert: AlertsProvider,
    public cities: CitiesProvider,
    public media: MediaProvider,
    public fire: FirebaseProvider,
    public db: StorageDb,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

    this.vehicle = navParams.get('vehicle')
    this.buildFormOwner()
    this.setForm()
  }

  ionViewDidLoad() {
    this.getProfile()
    this.getDepartment()
    this.getProfilePicture()
  }

  setForm() {
    console.log(JSON.stringify(this.vehicle))

    if (this.vehicle === undefined || this.vehicle === null) {
      return
    }

    if (this.vehicle['propietario'] !== undefined) {
      if (this.vehicle['propietario'] === 'Si') {
        this.ownerForm.controls['owner_yes'].setValue(true)
        this.ownerForm.controls['owner_no'].setValue(false)
      } else if (this.vehicle['propietario'] === 'No') {
        this.ownerForm.controls['owner_yes'].setValue(false)
        this.ownerForm.controls['owner_no'].setValue(true)

        this.is_owner = 0

        if (this.vehicle['tenedor'] !== undefined) {
          if (this.vehicle['tenedor'] === 'Si') {
            this.showImageLetter = true
            this.ownerForm.controls['owner_prop_yes'].setValue(false)
            this.ownerForm.controls['owner_prop_no'].setValue(true)
          } else if (this.vehicle['tenedor'] === 'No') {
            this.showImageLetter = false
            this.ownerForm.controls['owner_prop_yes'].setValue(true)
            this.ownerForm.controls['owner_prop_no'].setValue(false)
          }
        } else {
          this.ownerForm.controls['owner_prop_yes'].setValue(false)
          this.ownerForm.controls['owner_prop_no'].setValue(false)
        }
      }
    } else {
      this.ownerForm.controls['owner_yes'].setValue(false)
      this.ownerForm.controls['owner_no'].setValue(false)
    }

    console.log(this.vehicle['prop_tipo_persona'])

    if (this.vehicle['prop_tipo_persona'] !== undefined) {
      this.ownerForm.controls['owner_type'].setValue(this.vehicle['prop_tipo_persona'])
      if (this.vehicle['prop_tipo_persona'] === 'natural') {

        const objArray = [
          { item: 'prop_tipo_identificacion', form: 'owner_id_type' },
          { item: 'prop_identificacion', form: 'owner_id' },
          { item: 'prop_primer_nombre', form: 'owner_first_name' },
          { item: 'prop_segundo_nombre', form: 'owner_second_name' },
          { item: 'prop_primer_apellido', form: 'owner_first_lastname' },
          { item: 'prop_segundo_apellido', form: 'owner_second_lastname' },
          { item: 'prop_pais', form: 'owner_country' },
          { item: 'prop_departamento', form: 'owner_department' },
          { item: 'prop_municipio', form: 'owner_state' },
          { item: 'prop_direccion', form: 'owner_address' },
          { item: 'prop_celular', form: 'owner_mobil' },
          { item: 'prop_telefono', form: 'owner_phone' },
          { item: 'prop_email', form: 'owner_email' }
        ]

        objArray.map(item => {
          if (this.vehicle[item.item] !== undefined) {
            this.ownerForm.controls[item.form].setValue(this.vehicle[item.item])
          }
        })

      }
    } else {
      const objArray = [
        { item: 'prop_razon_social', form: 'owner_business_name' },
        { item: 'prop_nit', form: 'owner_nit' },
        { item: 'prop_pais', form: 'owner_country' },
        { item: 'prop_departamento', form: 'owner_department' },
        { item: 'prop_municipio_negocio', form: 'owner_municipality' },
        { item: 'prop_direccion_negocio', form: 'owner_address' },
        { item: 'prop_celular_negocio', form: 'owner_mobile' },
        { item: 'prop_telefono_negocio', form: 'owner_phone' },
        { item: 'prop_repre_primer_nombre', form: 'owner_first_name_legal_rep' },
        { item: 'prop_repre_segundo_nombre', form: 'owner_second_name_legal_rep' },
        { item: 'prop_repre_primer_apellido', form: 'owner_surname_legal_rep' },
        { item: 'prop_repre_segundo_apellido', form: 'owner_second_surname_legal_rep' },
        { item: 'prop_repre_documento', form: 'owner_number_id_legal_rep' },
        { item: 'prop_repre_celular', form: 'owner_phone_legal_rep' },
        { item: 'prop_repre_email', form: 'owner_email_legal_rep' }
      ]

      objArray.map(item => {
        if (this.vehicle[item.item] !== undefined) {
          this.ownerForm0.controls[item.form].setValue(this.vehicle[item.item])
        }
      })
    }

  }

  buildFormOwner() {

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
      owner_country: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_department: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_state: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_address: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_mobil: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_phone: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_email: ['', Validators.compose([
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
      owner_number_id_legal_rep: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_phone_legal_rep: ['', Validators.compose([
        Validators.minLength(0)])],
      owner_email_legal_rep: ['', Validators.compose([
        Validators.minLength(0)])]
    })
  }

  async getProfilePicture(){
    const loader = this.loadingCtrl.create({})
    loader.present()
    const userId = await this.getUserId()

    this.fire.getProfilePicture(this.pictureMode, userId, this.vehicle._id).then(res =>{

      if(res !== null){
        this.picturesObj.map(picture =>{
          if(res[picture.name] !== undefined && res[picture.name].includes('http')){
            this[picture.name] = res[picture.name]
          }
        })
      }

      loader.dismiss()

    }).catch(e =>{
      loader.dismiss()
      console.error('error ' + e)
    })

  }

  setPicture(id) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Subir foto',
      buttons: [
        {
          text: 'Tomar Foto',
          role: 'takePicure',
          handler: () => {
            this.takePicture(id, 1)

          }
        },
        {
          text: 'Seleccionar de Galeria',
          role: 'takePicture',
          handler: () => {
            this.takePicture(id, 0)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancel clicked')
          }
        }
      ]
    })
    actionSheet.present()
  }

  takePicture(modelPicture, mode) {
    this.media.takePicture(mode)
      .then(res => {
        const modal = this.modalCtrl.create('ModalCropSharedComponent', { picture: res })
        modal.onDidDismiss(data => {
          if (data) {
            this[modelPicture] = data.cropResult
          }
        })
        modal.present()
      }).catch(e => {
        console.error(e)
      })
  }

  getDepartment() {
    this.cities.getAllData().then(() => {
      this.cities.getDepartments().then(res => {
        this.departmentsOptions = res
        this.getCity(0)
      })
    })
  }

  getCity(mode) {
    let department
    if (mode === 0) {
      department = this.ownerForm.controls['owner_department'].value
    } else if (mode === 1) {
      department = this.ownerForm0.controls['owner_department'].value
    }

    if (department !== '') {
      const i = this.departmentsOptions.indexOf(department)
      this.cities.getCities(i).then(res => {
        this.citiesOptions = res
      })
    }
  }

  getProfile() {
    this.auth.getDriver().then(res => {
      this.userData = res['data'].id_driver
    })
  }

  async saveOnePicture(dataImg, id, name){
    const img = dataImg.substring(23)
    return await this.fire.uploadPicture(img, id, name).then(res => {
      return res
    }).catch(e => {
      console.error('error upload ' + e.message)
      return null
    })
  }

  isBase64Img(str) {
    try {
        return str.includes('data:image/jpeg;base64')
    } catch (e) {
        return false
    }
  }

  async getUserId() {
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
      return res.userId
    })
  }

  async save() {
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
      this.cart.owner_country = this.ownerForm.controls['owner_country'].value
      this.cart.owner_department = this.ownerForm.controls['owner_department'].value
      this.cart.owner_state = this.ownerForm.controls['owner_state'].value
      this.cart.owner_address = this.ownerForm.controls['owner_address'].value
      this.cart.owner_mobil = this.ownerForm.controls['owner_mobil'].value
      this.cart.owner_phone = this.ownerForm.controls['owner_phone'].value
      this.cart.owner_email = this.ownerForm.controls['owner_email'].value

      console.log(JSON.stringify(this.cart))


      const userId = await this.getUserId()

      let dataArray = {}

      if(this.holderLetter !== this.noImg && this.isBase64Img(this.holderLetter)){
        this.saveOnePicture(this.holderLetter , userId, 'holderLetter').then(res =>{
          console.log('save image ' + res)
          if(res !== null){
            dataArray['holderLetter']= res
            this.fire.saveImageProfilePath(this.pictureMode, dataArray, userId, this.vehicle._id)
            this.cartApi.updateVehicleHolderImages(dataArray, this.vehicle._id).then(res =>{
              console.log('save path to mongo server success ' + res)
            })
          }
        })
      }else{
        dataArray['holderLetter'] = this.holderLetter
        this.fire.saveImageProfilePath(this.pictureMode, dataArray, userId, this.vehicle._id)
        this.cartApi.updateVehicleHolderImages(dataArray, this.vehicle._id).then(res =>{
          console.log('save path to mongo server success ' + res)
        })
      }

      this.cartApi.updateVehicleAddOwnerNat(this.cart, this.vehicle._id).then(res => {
        if (res) {
          loader.dismiss()
          this.navCtrl.pop()
          this.alert.showAlert('Información Actualizada', 'Se ha actualizado tu vehículo correctamente')
        }
      }).catch(e => {
        console.error(e)
        loader.dismiss()
        this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tu vehículo, intenta de nuevo.')
      })

    } else if (this.show_type === 1) {

      this.cart.owner_business_name = this.ownerForm0.controls['owner_business_name'].value
      this.cart.owner_nit = this.ownerForm0.controls['owner_nit'].value
      this.cart.owner_country = this.ownerForm0.controls['owner_country'].value
      this.cart.owner_department = this.ownerForm0.controls['owner_department'].value
      this.cart.owner_municipality = this.ownerForm0.controls['owner_municipality'].value
      this.cart.owner_address = this.ownerForm0.controls['owner_address'].value
      this.cart.owner_mobile = this.ownerForm0.controls['owner_mobile'].value
      this.cart.owner_phone = this.ownerForm0.controls['owner_phone'].value
      this.cart.owner_first_name_legal_rep = this.ownerForm0.controls['owner_first_name_legal_rep'].value
      this.cart.owner_second_name_legal_rep = this.ownerForm0.controls['owner_second_name_legal_rep'].value
      this.cart.owner_surname_legal_rep = this.ownerForm0.controls['owner_surname_legal_rep'].value
      this.cart.owner_second_surname_legal_rep = this.ownerForm0.controls['owner_second_surname_legal_rep'].value
      this.cart.owner_number_id_legal_rep = this.ownerForm0.controls['owner_number_id_legal_rep'].value
      this.cart.owner_phone_legal_rep = this.ownerForm0.controls['owner_phone_legal_rep'].value
      this.cart.owner_email_legal_rep = this.ownerForm0.controls['owner_email_legal_rep'].value

      console.log(JSON.stringify(this.cart))

      this.cartApi.updateVehicleAddOwnerJur(this.cart, this.vehicle._id).then(res => {
        console.log(JSON.stringify(res))
        loader.dismiss()
        this.navCtrl.pop()

        this.alert.showAlert('Información Actualizada', 'Se ha actualizado tu vehículo correctamente')
      }).catch(e => {
        console.error(e)
        loader.dismiss()
        this.alert.showAlert('Error', 'Ha ocurrido un error actualizando tu vehículo, intenta de nuevo.')
      })
    }
  }

  onType(event) {
    if (event === 'natural') {
      this.show_type = 0
    } else if (event === 'juridica') {
      this.show_type = 1
    }
  }

  ckOwnerYes() {
    if(this.ownerForm.controls['owner_yes'].value) {
      console.log(JSON.stringify(this.userData))
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
      this.ownerForm.controls['owner_country'].setValue(this.userData.pais)
      this.ownerForm.controls['owner_department'].setValue(this.userData.departamento)
      this.getCity(0)
      this.ownerForm.controls['owner_state'].patchValue(this.userData.ciudad)
      this.ownerForm.controls['owner_address'].setValue(this.userData.direccion)
      this.ownerForm.controls['owner_mobil'].setValue(this.userData.celular)
      this.ownerForm.controls['owner_phone'].setValue(this.userData.telefono_1)
      this.ownerForm.controls['owner_email'].setValue(this.userData.email)
    } else {
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
      this.ownerForm.controls['owner_country'].setValue('')
      this.ownerForm.controls['owner_department'].setValue('')
      this.ownerForm.controls['owner_state'].setValue('')
      this.ownerForm.controls['owner_address'].setValue('')
      this.ownerForm.controls['owner_mobil'].setValue('')
      this.ownerForm.controls['owner_phone'].setValue('')
      this.ownerForm.controls['owner_email'].setValue('')
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
      this.ownerForm.controls['owner_email'].setValue('')
    } else if (this.ownerForm.controls['owner_no'].value === false) {
      this.is_owner = 1
      this.cart.owner = ''
    }
  }

  ckOwnerProYes() {
    this.showImageLetter = false
    if(this.ownerForm.controls['owner_prop_yes'].value) {
      this.ownerForm.controls['owner_prop_no'].setValue(false)
      this.cart.fork_info = 'No'
    }else{
      this.cart.fork_info = 'Si'
    }
  }

  ckOwnerProNo() {
    if (this.ownerForm.controls['owner_prop_no'].value) {
      this.showImageLetter = true
      this.ownerForm.controls['owner_prop_yes'].setValue(false)
      this.cart.fork_info = 'Si'
    } else {
      this.cart.fork_info = 'No'
      this.showImageLetter = false
    }
  }

}
