import { Component, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, ModalController, Content } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { DriverAuthProvider } from '@providers/api/driverAuth'
import { AlertsProvider } from '@providers/alerts'
import { FirebaseProvider } from '@providers/firebase'
import { StorageDb } from '@providers/storageDb'
import { MediaProvider } from '@providers/media'
import { CONFIG } from '@providers/config'

@IonicPage()
@Component({
  selector: 'profile-bank-driver',
  templateUrl: 'profile-bank.html'
})
export class ProfileBankDriverPage {
  @ViewChild(Content) content: Content

  bankForm: FormGroup
  bankForm0: FormGroup

  show_nequi: number = 0
  show_bank: number = 0
  show_nequi_balance: number = 0
  show_bank_balance: number = 0
  step_form: number = 0

  disablenequi: boolean = false
  disableBank: boolean = false
  disablenequi_balance: boolean = false
  disableBank_balance: boolean = false

  profile_bank: any = {}
  user: any

  step_images: any = [
    './assets/imgs/step-1-2.png',
    './assets/imgs/step-2-2.png'
  ]
  step_img: string = this.step_images[0]

  step_lable: any = [
    'Recibir mis pagos por ANTICIPO en: ',
    'Recibir mis pagos por SALDOS en: '
  ]
  step_tittle: string = this.step_lable[0]

  type_account_category: any = [
    { value: 'Ahorros', name: 'Ahorros' },
    { value: 'Corriente', name: 'Corriente' }
  ]

  noImg: string = './assets/imgs/no_photo.png'
  advanceAutorization: string = this.noImg
  advanceCertificate: string = this.noImg
  advanceLetter: string = this.noImg
  balanceAutorization: string = this.noImg
  balanceCertificate: string = this.noImg
  balanceLetter: string = this.noImg

  pictureMode: number = 1

  picturesObj = [
    {name: 'advanceAutorization'},
    {name: 'advanceCertificate'},
    {name: 'advanceLetter'},
    {name: 'balanceAutorization'},
    {name: 'balanceCertificate'},
    {name: 'balanceLetter'}
  ]

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public auth: DriverAuthProvider,
    public alert: AlertsProvider,
    public fire: FirebaseProvider,
    public db: StorageDb,
    public media: MediaProvider,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController

  ) {

    this.user = this.navParams.get('profile')

    this.show_nequi = 1
    this.show_bank = 0

    this.buildBankForm()

  }

  ionViewDidLoad() {
    this.setBankInformation()
    this.getProfilePicture()
  }

  buildBankForm(){
    this.bankForm = this.formBuilder.group({
      checkbank: [''],
      checknequi: [''],
      phone: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      name_beneficiary: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      id_beneficiary: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      bank: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      account: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      name: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      id: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      account_type: ['', Validators.compose([
        Validators.minLength(0)
      ])]
    })

    this.bankForm0 = this.formBuilder.group({
      equal: [''],
      checkbank_balance: [''],
      checknequi_balance: [''],
      phone_balance: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      name_beneficiary_balance: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      id_beneficiary_balance: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      bank_balance: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      account_balance: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      name_balance: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      id_balance: ['', Validators.compose([
        Validators.minLength(0)
      ])],
      account_type_balance: ['', Validators.compose([
        Validators.minLength(0)
      ])]
    })

  }

  async getProfilePicture(){
    const loader = this.loadingCtrl.create({})
    loader.present()
    const userId = await this.getUserId()

    this.fire.getProfilePicture(this.pictureMode, userId, null).then(res =>{
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

  setBankInformation(){
    this.bankForm.controls['checknequi'].setValue(true)
    this.bankForm.controls['checkbank'].setValue(false)
    this.bankForm0.controls['equal'].setValue(false)
    this.bankForm0.controls['checknequi_balance'].setValue(false)
    this.bankForm0.controls['checkbank_balance'].setValue(false)

    if (this.user != undefined && this.user != null) {

      if (this.user.pago_anticipo != undefined
          && this.user.pago_anticipo.billetera !== undefined
          && this.user.pago_anticipo.billetera.numero_celular !== undefined
          && this.user.pago_anticipo.billetera.numero_celular.length > 0) {

        this.show_nequi = 1
        this.show_bank = 0
        this.disablenequi = false
        this.disableBank = true

        this.bankForm.controls['checknequi'].setValue(true)
        this.bankForm.controls['checkbank'].setValue(false)
        this.bankForm.controls['phone'].setValue(this.user.pago_anticipo.billetera.numero_celular)
        this.bankForm.controls['name_beneficiary'].setValue(this.user.pago_anticipo.billetera.nombre_beneficiario)
        this.bankForm.controls['id_beneficiary'].setValue(this.user.pago_anticipo.billetera.identificacion_beneficiario)

      } else if (this.user.pago_anticipo != undefined
                  && this.user.pago_anticipo.banco !== undefined
                  && this.user.pago_anticipo.banco.nombre_banco !== undefined
                  && this.user.pago_anticipo.banco.nombre_banco.length > 0) {

        this.show_nequi = 0
        this.show_bank = 1

        this.bankForm.controls['checknequi'].setValue(false)
        this.bankForm.controls['checkbank'].setValue(true)
        this.bankForm.controls['bank'].setValue(this.user.pago_anticipo.banco.nombre_banco)
        this.bankForm.controls['account'].setValue(this.user.pago_anticipo.banco.numero_cuenta)
        this.bankForm.controls['name'].setValue(this.user.pago_anticipo.banco.nombre_titular)
        this.bankForm.controls['id'].setValue(this.user.pago_anticipo.banco.cedula_titular)
        this.bankForm.controls['account_type'].setValue(this.user.pago_anticipo.banco.tipo_cuenta)
      }

      if (this.user.pago_saldo != undefined && this.user.pago_saldo.igual_anticipo === true) {
        this.bankForm0.controls['equal'].setValue(true)
      }

      if (this.user.pago_saldo != undefined
          && this.user.pago_saldo.billetera.numero_celular.length > 0) {

        this.show_nequi_balance = 1
        this.show_bank_balance = 0
        this.disablenequi_balance = false
        this.disableBank_balance = true

        this.bankForm0.controls['checknequi_balance'].setValue(true)
        this.bankForm0.controls['checkbank_balance'].setValue(false)
        this.bankForm0.controls['phone_balance'].setValue(this.user.pago_saldo.billetera.numero_celular)
        this.bankForm0.controls['name_beneficiary_balance'].setValue(this.user.pago_saldo.billetera.nombre_beneficiario)
        this.bankForm0.controls['id_beneficiary_balance'].setValue(this.user.pago_saldo.billetera.identificacion_beneficiario)

      } else if (this.user.pago_saldo != undefined
                  && this.user.pago_saldo.banco.nombre_banco !== null
                  && this.user.pago_saldo.banco.nombre_banco.length > 0) {

        this.show_nequi_balance = 0
        this.show_bank_balance = 1

        this.bankForm0.controls['checknequi_balance'].setValue(false)
        this.bankForm0.controls['checkbank_balance'].setValue(true)
        this.bankForm0.controls['bank_balance'].setValue(this.user.pago_saldo.banco.nombre_banco)
        this.bankForm0.controls['account_balance'].setValue(this.user.pago_saldo.banco.numero_cuenta)
        this.bankForm0.controls['name_balance'].setValue(this.user.pago_saldo.banco.nombre_titular)
        this.bankForm0.controls['id_balance'].setValue(this.user.pago_saldo.banco.cedula_titular)
        this.bankForm0.controls['account_type_balance'].setValue(this.user.pago_saldo.banco.tipo_cuenta)
      }
    }
  }

  scrollToTop() {
    this.content.scrollToTop()
  }

  async getUserId() {
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
      return res.userId
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

  checkselectNequi() {
    if(this.bankForm.controls['checknequi'].value) {
      this.bankForm.controls['checkbank'].setValue(false)
      this.show_nequi = 1
      this.show_bank = 0
    }else{
      this.bankForm.controls['checkbank'].setValue(true)
      this.show_nequi = 0
      this.show_bank = 1
    }
  }

  checkselectBank() {
    if(this.bankForm.controls['checkbank'].value) {
      this.bankForm.controls['checknequi'].setValue(false)
      this.show_nequi = 0
      this.show_bank = 1
      this.disableBank = false
    }else{
      this.bankForm.controls['checknequi'].setValue(true)
      this.show_nequi = 1
      this.show_bank = 0
    }
  }

  checkselectNequi_balance() {
    if(this.bankForm0.controls['checknequi_balance'].value) {

      this.show_nequi_balance = 1
      this.show_bank_balance = 0
      this.disablenequi_balance = false

      this.bankForm0.controls['equal'].setValue(false)
      this.bankForm0.controls['checkbank_balance'].setValue(false)
      this.bankForm0.controls['phone_balance'].setValue('')
      this.bankForm0.controls['name_beneficiary_balance'].setValue('')
      this.bankForm0.controls['id_beneficiary_balance'].setValue('')

    }else {
      this.show_nequi_balance = 0
      this.show_bank_balance = 1
      this.disablenequi_balance = true

      this.bankForm0.controls['checkbank_balance'].setValue(true)
      this.bankForm0.controls['bank_balance'].setValue('')
      this.bankForm0.controls['account_balance'].setValue('')
      this.bankForm0.controls['name_balance'].setValue('')
      this.bankForm0.controls['id_balance'].setValue('')
      this.bankForm0.controls['account_type_balance'].setValue('')
    }
  }

  checkselectBank_balance() {
    if(this.bankForm0.controls['checkbank_balance'].value) {

      this.show_nequi_balance = 0
      this.show_bank_balance = 1
      this.disableBank_balance = false

      this.bankForm0.controls['equal'].setValue(false)
      this.bankForm0.controls['checknequi_balance'].setValue(false)

    }else {

      this.show_nequi_balance = 1
      this.show_bank_balance = 0
      this.disableBank_balance = true

      this.bankForm0.controls['checknequi_balance'].setValue(true)
    }
  }

  checkselectequal() {

    if (this.bankForm0.controls['equal'].value) {

      this.profile_bank.equal = true
      this.disableBank_balance = true
      this.disablenequi_balance = true

      if (this.user.pago_anticipo != undefined){

        if(this.user.pago_anticipo.billetera.numero_celular.length > 0) {

          this.show_nequi_balance = 1
          this.show_bank_balance = 0
          this.disableBank_balance = true
          this.disablenequi_balance = true

          this.bankForm0.controls['checknequi_balance'].setValue(true)
          this.bankForm0.controls['checkbank_balance'].setValue(false)
          this.bankForm0.controls['phone_balance'].setValue(this.user.pago_anticipo.billetera.numero_celular)
          this.bankForm0.controls['name_beneficiary_balance'].setValue(this.user.pago_anticipo.billetera.nombre_beneficiario)
          this.bankForm0.controls['id_beneficiary_balance'].setValue(this.user.pago_anticipo.billetera.identificacion_beneficiario)

          this.balanceAutorization = this.advanceAutorization

        } else if (this.user.pago_anticipo.banco.nombre_banco.length > 0) {

          this.show_nequi_balance = 0
          this.show_bank_balance = 1
          this.disableBank_balance = true
          this.disablenequi_balance = true

          this.balanceCertificate = this.advanceCertificate
          this.balanceLetter = this.advanceLetter

          this.bankForm0.controls['checknequi_balance'].setValue(false)
          this.bankForm0.controls['checkbank_balance'].setValue(true)
          this.bankForm0.controls['bank_balance'].setValue(this.user.pago_anticipo.banco.nombre_banco)
          this.bankForm0.controls['account_balance'].setValue(this.user.pago_anticipo.banco.numero_cuenta)
          this.bankForm0.controls['name_balance'].setValue(this.user.pago_anticipo.banco.nombre_titular)
          this.bankForm0.controls['id_balance'].setValue(this.user.pago_anticipo.banco.cedula_titular)
          this.bankForm0.controls['account_type_balance'].setValue(this.user.pago_anticipo.banco.tipo_cuenta)
        }
      }

    }else {

      this.profile_bank.equal = false
      this.show_nequi_balance = 0
      this.show_bank_balance = 0
      this.disablenequi_balance = false
      this.disableBank_balance = false

      this.bankForm0.controls['checknequi_balance'].setValue(false)
      this.bankForm0.controls['checkbank_balance'].setValue(false)
      this.bankForm0.controls['phone_balance'].setValue('')
      this.bankForm0.controls['name_beneficiary_balance'].setValue('')
      this.bankForm0.controls['id_beneficiary_balance'].setValue('')
      this.bankForm0.controls['bank_balance'].setValue('')
      this.bankForm0.controls['account_balance'].setValue('')
      this.bankForm0.controls['name_balance'].setValue('')
      this.bankForm0.controls['id_balance'].setValue('')
      this.bankForm0.controls['account_type_balance'].setValue('')
    }
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

  async saveBank() {

    let dataArray = {}

    if (this.step_form === 0) {

      this.profile_bank.paso = 1

      if (this.bankForm.controls['checknequi'].value) {

        if(this.bankForm.controls['phone'].value === ''
          || this.bankForm.controls['name_beneficiary'].value === ''
          || this.bankForm.controls['id_beneficiary'].value === ''){
            this.alert.showAlert('Error', 'Debes completar todos los campos para continuar')
            return
        }

        this.profile_bank.bank = ''
        this.profile_bank.account = ''
        this.profile_bank.name = ''
        this.profile_bank.id = ''
        this.profile_bank.account_type = ''

        this.profile_bank.phone = this.bankForm.controls['phone'].value
        this.profile_bank.name_beneficiary = this.bankForm.controls['name_beneficiary'].value
        this.profile_bank.id_beneficiary = this.bankForm.controls['id_beneficiary'].value
        this.profile_bank.type = 1

        const userId = await this.getUserId()

        if(this.advanceAutorization !== this.noImg && this.isBase64Img(this.advanceAutorization)){
          this.saveOnePicture(this.advanceAutorization , userId, 'advanceAutorization').then(res =>{
            console.log('save image ' + res)
            if(res !== null){
              dataArray['advanceAutorization']= res
              this.fire.updateBankImagesPath(userId, dataArray)
              this.auth.updateBankInformationPhotos(dataArray)
            }
          })
        }else{
          dataArray['advanceAutorization'] = this.advanceAutorization
          this.fire.updateBankImagesPath(userId, dataArray)
          this.auth.updateBankInformationPhotos(dataArray)
        }

        this.auth.bankData(this.profile_bank).then(res => {
          if(res){
            this.user = res['data']
            this.alert.showAlert('Datos bancarios para pagos de anticipo', 'Se ha guardado correctamente')
          }
        }).catch(e => {
          console.error(e)
          this.alert.showAlert('Error', 'Ocurrio un error, intente de nuevo')
        })

      } else if (this.bankForm.controls['checkbank'].value) {

        if(this.bankForm.controls['bank'].value === ''
          || this.bankForm.controls['account'].value === ''
          || this.bankForm.controls['name'].value === ''
          || this.bankForm.controls['id'].value === ''
          || this.bankForm.controls['account_type'].value === ''){
          this.alert.showAlert('Error', 'Debes completar todos los campos para continuar')
          return
        }

        this.profile_bank.phone = ''
        this.profile_bank.name_beneficiary = ''
        this.profile_bank.id_beneficiary = ''

        this.profile_bank.bank = this.bankForm.controls['bank'].value
        this.profile_bank.account = this.bankForm.controls['account'].value
        this.profile_bank.name = this.bankForm.controls['name'].value
        this.profile_bank.id = this.bankForm.controls['id'].value
        this.profile_bank.account_type = this.bankForm.controls['account_type'].value
        this.profile_bank.type = 2

        const userId = await this.getUserId()

        let arrayImgs = []

        let dataArray = {}

        this.picturesObj.map(obj =>{
          if(obj.name === 'advanceCertificate' || obj.name === 'advanceLetter'){
              if(this[obj.name] != this.noImg && this.isBase64Img(this[obj.name])){
                arrayImgs.push({ model: this[obj.name], id: userId, name: obj.name})
              }else{
                dataArray[obj.name] = this[obj.name] === this.noImg ? null : this[obj.name]
              }
          }
        })

        const results = arrayImgs.map(obj =>{
          const img = obj.model.substring(23)
          return this.fire.uploadPicture(img, obj.id, obj.name).then(res => {
            return dataArray[obj.name] = res
          }).catch(e => {
            console.error('error upload ' + e.message)
          })
        })

        Promise.all(results).then(completed =>{
          console.log('completed ' + completed)
          this.fire.updateBankImagesPath(userId, dataArray)
          this.auth.updateBankInformationPhotos(dataArray)
        })

        this.auth.bankData(this.profile_bank)
          .then(res => {
            if(res){
              this.user = res['data']
              this.alert.showAlert('Datos bancarios para pagos de anticipo', 'Se ha guardado correctamente')
            }
          })
          .catch(error => {
            console.log(error)
            this.alert.showAlert('Error', 'Ocurrio un error, intente de nuevo')
          })
      }

      this.step_form++
      this.step_img = this.step_images[1]
      this.step_tittle = this.step_lable[1]

    } else if (this.step_form === 1) {

      console.log('dataArray (1) ' + JSON.stringify(dataArray))

      this.profile_bank.paso = 2

      if (this.bankForm0.controls['checknequi_balance'].value) {

        if(this.bankForm0.controls['phone_balance'].value === ''
          || this.bankForm0.controls['name_beneficiary_balance'].value === ''
          || this.bankForm0.controls['id_beneficiary_balance'].value === ''){
          this.alert.showAlert('Error', 'Debes completar todos los campos para continuar')
          return
        }

        this.profile_bank.bank = ''
        this.profile_bank.account = ''
        this.profile_bank.account_type = ''

        this.profile_bank.phone = this.bankForm0.controls['phone_balance'].value
        this.profile_bank.name_beneficiary = this.bankForm0.controls['name_beneficiary_balance'].value
        this.profile_bank.id_beneficiary = this.bankForm0.controls['id_beneficiary_balance'].value
        this.profile_bank.type = 1

        const userId = await this.getUserId()

        if(this.balanceAutorization !== this.noImg && this.isBase64Img(this.balanceAutorization)){
          this.saveOnePicture(this.balanceAutorization , userId, 'balanceAutorization').then(res =>{
            console.log('save image ' + res)
            if(res !== null){
              dataArray['balanceAutorization']= res
              // this.fire.saveImageProfilePath(this.pictureMode, dataArray, userId, null).then(() =>{
              //   console.log('save path success ' + JSON.stringify(dataArray) )
              // })
              this.fire.updateBankImagesPath(userId, dataArray)
              this.auth.updateBankInformationPhotos(dataArray)
            }
          })
        }else{
          dataArray['balanceAutorization'] = this.balanceAutorization
          this.fire.updateBankImagesPath(userId, dataArray)
          this.auth.updateBankInformationPhotos(dataArray)
        }

        this.auth.bankData(this.profile_bank).then(res => {
          if(res){
            this.alert.showAlert('Datos bancarios para pagos de saldos', 'Se ha guardado correctamente')
            this.navCtrl.setRoot('home-drive')
          }
        }).catch(e => {
          console.error(e)
          this.alert.showAlert('Error', 'Ocurrio un error, intente de nuevo')
        })

      }else if (this.bankForm0.controls['checkbank_balance'].value) {

        if(this.bankForm0.controls['bank_balance'].value === ''
          || this.bankForm0.controls['account_balance'].value === ''
          || this.bankForm0.controls['name_balance'].value === ''
          || this.bankForm0.controls['id_balance'].value === ''
          || this.bankForm0.controls['account_type_balance'].value === ''){
            this.alert.showAlert('Error', 'Debes completar todos los campos para continuar')
            return
        }

        this.profile_bank.phone = ''
        this.profile_bank.name_beneficiary = ''
        this.profile_bank.id_beneficiary = ''

        this.profile_bank.bank = this.bankForm0.controls['bank_balance'].value
        this.profile_bank.account = this.bankForm0.controls['account_balance'].value
        this.profile_bank.name = this.bankForm0.controls['name_balance'].value
        this.profile_bank.id = this.bankForm0.controls['id_balance'].value
        this.profile_bank.account_type = this.bankForm0.controls['account_type_balance'].value
        this.profile_bank.type = 2

        const userId = await this.getUserId()

        let arrayImgs = []

        let dataArray = {}

        this.picturesObj.map(obj =>{
          if(obj.name === 'balanceCertificate' || obj.name === 'balanceLetter'){
              if(this[obj.name] != this.noImg && this.isBase64Img(this[obj.name])){
                arrayImgs.push({ model: this[obj.name], id: userId, name: obj.name})
              }else{
                dataArray[obj.name] = this[obj.name] === this.noImg ? null : this[obj.name]
              }
          }
        })

        const results = arrayImgs.map(obj =>{
          const img = obj.model.substring(23)
          return this.fire.uploadPicture(img, obj.id, obj.name).then(res => {
            return dataArray[obj.name] = res
          }).catch(e => {
            console.error('error upload ' + e.message)
          })
        })

        Promise.all(results).then(completed =>{
          console.log('completed ' + completed)
          this.fire.updateBankImagesPath(userId, dataArray)
          this.auth.updateBankInformationPhotos(dataArray)
          // this.fire.saveImageProfilePath(this.pictureMode, dataArray, userId, null).then(() => {
          //   console.log('save image path ')
          // }).catch(e => {
          //   console.error('Error to save image path ' + e)
          // })
        })

        this.auth.bankData(this.profile_bank).then(res => {
            if(res){
              this.alert.showAlert('Datos bancarios para pagos de saldos', 'Se ha guardado correctamente')
              this.navCtrl.setRoot('home-drive')
            }
        }).catch(error => {
            console.log(error)
            this.alert.showAlert('Error', 'Ocurrio un error, intente de nuevo')
        })

      }
    }
  }

}
