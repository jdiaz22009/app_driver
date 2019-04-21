import { Component, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, ModalController, Content } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DriverAuthProvider } from '@providers/api/driverAuth'
import { AlertsProvider } from '@providers/alerts'
import { FirebaseProvider } from '@providers/firebase';
import { StorageDb } from '@providers/storageDb';
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
  // checknequi: boolean;
  // checkbank: boolean;
  disablenequi: boolean = false;
  disableBank: boolean = false;
  disablenequi_balance: boolean = false;
  disableBank_balance: boolean = false;
  profile_bank: any = {}
  nophonto: string = './assets/imgs/no_photo.png'
  bankCertificate: string = this.nophonto
  holdingLetter: string = this.nophonto
  bankCertificate_balance: string = this.nophonto
  holdingLetter_balance: string = this.nophonto


  show_nequi_balance: number = 0
  show_bank_balance: number = 0
  user: any
  driver: any
  step_form: number = 0

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

    this.show_nequi = 1
    this.show_bank = 0

    this.bankForm = this.formBuilder.group({
      checkbank: ['', Validators.compose([
        // Validators.minLength(0)
        // ,Validators.required
      ])],
      checknequi: ['', Validators.compose([
        // Validators.minLength(0)
        // ,Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      name_beneficiary: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      id_beneficiary: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      bank: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      account: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      name: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      id: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      account_type: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])]
    })

    this.bankForm0 = this.formBuilder.group({
      equal: ['', Validators.compose([
        // Validators.minLength(0)
        // ,Validators.required
      ])],
      checkbank_balance: ['', Validators.compose([
        // Validators.minLength(0)
        // ,Validators.required
      ])],
      checknequi_balance: ['', Validators.compose([
        // Validators.minLength(0)
        // ,Validators.required
      ])],
      phone_balance: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      name_beneficiary_balance: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      id_beneficiary_balance: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      bank_balance: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      account_balance: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      name_balance: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      id_balance: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])],
      account_type_balance: ['', Validators.compose([
        Validators.minLength(0)
        // ,Validators.required
      ])]
    })


  }

  ionViewDidLoad() {
    //this.getProfileBankPicture()

    this.show_nequi = 1
    this.show_bank = 0
    console.log('--ProfileBank-- ionViewDidLoad show_nequi: ', this.show_nequi)
    console.log('--ProfileBank-- ionViewDidLoad show_bank: ', this.show_bank)
    this.getDriver()
    this.bankForm.controls['checknequi'].setValue(true)
    this.bankForm.controls['checkbank'].setValue(false)
    this.bankForm0.controls['equal'].setValue(false)
    this.bankForm0.controls['checknequi_balance'].setValue(false)
    this.bankForm0.controls['checkbank_balance'].setValue(false)

    this.user = this.navParams.get('profile')

    console.log('--ProfileBank-- USER: ', this.user)
    // console.log('--ProfileBank-- USER: ', this.user.pago_anticipo)
    this.bankForm0.controls['equal'].setValue(false)
    this.bankForm0.controls['checknequi_balance'].setValue(false)
    this.bankForm0.controls['checkbank_balance'].setValue(false)
    if (this.user != undefined && this.user != null) {
      if (this.user.pago_anticipo != undefined && this.user.pago_anticipo.billetera !== undefined && this.user.pago_anticipo.billetera.numero_celular !== undefined && this.user.pago_anticipo.billetera.numero_celular.length > 0) {
        this.bankForm.controls['checknequi'].setValue(true)
        this.bankForm.controls['checkbank'].setValue(false)
        this.show_nequi = 1
        this.show_bank = 0
        this.disablenequi = false
        this.disableBank = true
        console.log('--ProfileBank-- if (this.user.pago_anticipo.billetera) show_nequi: ', this.show_nequi)
        console.log('--ProfileBank-- if (this.user.pago_anticipo.billetera) show_bank: ', this.show_bank)
        this.bankForm.controls['phone'].setValue(this.user.pago_anticipo.billetera.numero_celular)
        this.bankForm.controls['name_beneficiary'].setValue(this.user.pago_anticipo.billetera.nombre_beneficiario)
        this.bankForm.controls['id_beneficiary'].setValue(this.user.pago_anticipo.billetera.identificacion_beneficiario)
      } else if (this.user.pago_anticipo != undefined && this.user.pago_anticipo.banco !== undefined && this.user.pago_anticipo.banco.nombre_banco !== undefined && this.user.pago_anticipo.banco.nombre_banco.length > 0) {
        this.bankForm.controls['checknequi'].setValue(false)
        this.bankForm.controls['checkbank'].setValue(true)
        this.show_nequi = 0
        this.show_bank = 1
        console.log('--ProfileBank-- this.user.pago_anticipo.banco show_nequi: ', this.show_nequi)
        console.log('--ProfileBank-- this.user.pago_anticipo.banco show_bank: ', this.show_bank)
        this.bankForm.controls['bank'].setValue(this.user.pago_anticipo.banco.nombre_banco)
        this.bankForm.controls['account'].setValue(this.user.pago_anticipo.banco.numero_cuenta)
        this.bankForm.controls['name'].setValue(this.user.pago_anticipo.banco.nombre_titular)
        this.bankForm.controls['id'].setValue(this.user.pago_anticipo.banco.cedula_titular)
        this.bankForm.controls['account_type'].setValue(this.user.pago_anticipo.banco.tipo_cuenta)
      }

      if (this.user.pago_saldo != undefined && this.user.pago_saldo.igual_anticipo === true) {
        this.bankForm0.controls['equal'].setValue(true)
        console.log('--ProfileBank-- this.user.pago_saldo.igual_anticipo: ', this.user.pago_saldo.igual_anticipo)

      }



      if (this.user.pago_saldo != undefined && this.user.pago_saldo.billetera.numero_celular.length > 0) {
        this.bankForm0.controls['checknequi_balance'].setValue(true)
        this.bankForm0.controls['checkbank_balance'].setValue(false)
        this.show_nequi_balance = 1
        this.show_bank_balance = 0
        this.disablenequi_balance = false
        this.disableBank_balance = true
        console.log('--ProfileBank-- if (this.user.pago_saldo.billetera) show_nequi_balance: ', this.show_nequi_balance)
        console.log('--ProfileBank-- if (this.user.pago_saldo.billetera) show_bank_balance: ', this.show_bank_balance)
        this.bankForm0.controls['phone_balance'].setValue(this.user.pago_saldo.billetera.numero_celular)
        this.bankForm0.controls['name_beneficiary_balance'].setValue(this.user.pago_saldo.billetera.nombre_beneficiario)
        this.bankForm0.controls['id_beneficiary_balance'].setValue(this.user.pago_saldo.billetera.identificacion_beneficiario)
      } else if (this.user.pago_saldo != undefined && this.user.pago_saldo.banco.nombre_banco !== null && this.user.pago_saldo.banco.nombre_banco.length > 0) {
        this.bankForm0.controls['checknequi_balance'].setValue(false)
        this.bankForm0.controls['checkbank_balance'].setValue(true)
        this.show_nequi_balance = 0
        this.show_bank_balance = 1
        console.log('--ProfileBank-- this.user.pago_saldo.banco show_nequi_balance_balance: ', this.show_nequi_balance)
        console.log('--ProfileBank-- this.user.pago_saldo.banco show_bank_balance_balance: ', this.show_bank_balance)
        this.bankForm0.controls['bank_balance'].setValue(this.user.pago_saldo.banco.nombre_banco)
        this.bankForm0.controls['account_balance'].setValue(this.user.pago_saldo.banco.numero_cuenta)
        this.bankForm0.controls['name_balance'].setValue(this.user.pago_saldo.banco.nombre_titular)
        this.bankForm0.controls['id_balance'].setValue(this.user.pago_saldo.banco.cedula_titular)
        this.bankForm0.controls['account_type_balance'].setValue(this.user.pago_saldo.banco.tipo_cuenta)
      }

    }
  }

  // async getProfileBankPicture() {
  //   const loader = this.loadingCtrl.create({})
  //   loader.present();
  //   const userID = await this.getUserId();
  //   this.fire.getProfilePicture(userID)
  //     .then(res => {
  //       loader.dismiss()
  //       console.log(res, 'res')
  //       if (res['bankCertificate'] !== undefined) {
  //         this.bankCertificate = res['bankCertificate']
  //       }

  //       if (res['holdingLetter'] !== undefined) {
  //         this.holdingLetter = res['holdingLetter']
  //       }
  //     })
  //     .catch(e => {
  //       loader.dismiss()
  //       console.error('Error' + e)
  //     })


  // }


  async getDriver() {
    this.auth.getDriver().then(res => {
      const photo = res['data']['id_driver'].banco
      this.driver = res['data']['id_driver']
      console.log(photo, 'photo response')
      if (photo !== undefined && photo.img_certificacion !== undefined) {
        this.bankCertificate = photo.img_certificacion
      }
      if (photo !== undefined && photo.img_tenencia !== undefined) {
        this.holdingLetter = photo.img_tenencia
      }




    })
  }



  async getUserId() {
    const id = await this.db.getItem(CONFIG.localdb.USER_KEY)
      .then(res => {
        return res.userId
      })
    return id
  }

  async saveBank() {
    if (this.step_form === 0) {
      this.profile_bank.paso = 1
      console.log('-ProfileBank- StepForm 1')
      console.log('-ProfileBank- User: ', this.user)
      console.log('-ProfileBank- Driver: ', this.driver)
      if (this.bankForm.controls['checknequi'].value === true
        // && this.bankForm.controls['phone'].value != ''
        // && this.bankForm.controls['name_beneficiary'].value != ''
        // && this.bankForm.controls['name_beneficiary'].value != ''
        // && this.bankForm.controls['id_beneficiary'].value != ''
      ) {
        console.log('--ProfileBank-- saveBank Entro a checknequi')
        this.profile_bank.phone = this.bankForm.controls['phone'].value
        this.profile_bank.name_beneficiary = this.bankForm.controls['name_beneficiary'].value
        this.profile_bank.id_beneficiary = this.bankForm.controls['id_beneficiary'].value
        this.profile_bank.bank = ''
        this.profile_bank.account = ''
        this.profile_bank.name = ''
        this.profile_bank.id = ''
        this.profile_bank.account_type = ''
        this.profile_bank.type = 1
        this.auth.bankData(this.profile_bank)
          .then(res => {
            console.log(JSON.stringify(res))
            this.alert.showAlert('Datos bancarios para pagos de anticipo', 'Se ha guardado correctamente')
            // this.navCtrl.setRoot('home-drive')
          })
          .catch(error => {
            console.log(error)
            this.alert.showAlert('Error', 'Ocurrio un error, intente de nuevo')
          })
        console.log(this.profile_bank)
      } else if (this.bankForm.controls['checkbank'].value === true
        // && this.bankForm.controls['bank'].value !== '' && this.bankForm.controls['bank'].value !== this.user.pago_anticipo.banco.nombre_banco
        // && this.bankForm.controls['account'].value !== '' && this.bankForm.controls['account'].value !== this.user.pago_anticipo.banco.numero_cuenta
        // && this.bankForm.controls['name'].value !== '' && this.bankForm.controls['name'].value !== this.user.pago_anticipo.banco.nombre_titular
        // && this.bankForm.controls['id'].value !== '' && this.bankForm.controls['id'].value !== this.user.pago_anticipo.banco.cedula_titular
        // && this.bankForm.controls['account_type'].value !== '' && this.bankForm.controls['account_type'].value !== this.user.pago_anticipo.banco.tipo_cuenta
      ) {
        console.log('--ProfileBank-- saveBank Entro a checkbank')
        console.log('--ProfileBank-- saveBank profile_bank: ', this.profile_bank)
        const userID = await this.getUserId()
        this.profile_bank.phone = ''
        this.profile_bank.name_beneficiary = ''
        this.profile_bank.id_beneficiary = ''
        this.profile_bank.bank = this.bankForm.controls['bank'].value
        this.profile_bank.account = this.bankForm.controls['account'].value
        this.profile_bank.name = this.bankForm.controls['name'].value
        this.profile_bank.id = this.bankForm.controls['id'].value
        this.profile_bank.account_type = this.bankForm.controls['account_type'].value
        this.profile_bank.type = 2

        let arrayImgs = []
        if (this.bankCertificate != this.nophonto) {
          console.log('entre al primer if')
          arrayImgs.push({
            model: this.bankCertificate,
            id: userID,
            name: 'bankCertificate'
          })
        }

        if (this.holdingLetter != this.nophonto) {
          console.log('entre al segundo if')
          arrayImgs.push({
            model: this.holdingLetter,
            id: userID,
            name: 'holdingLetter'
          })
        }

        console.log(arrayImgs, 'array')

        const indexArray = arrayImgs.length
        let dataArray = {
          bankCertificate: null,
          holdingLetter: null
        }
        arrayImgs.forEach((item, index) => {
          this.fire.uploadPicture(item.model, item.id, item.name)
            .then(res => {
              console.log(res, 'response arrayImgs')
              if (item.model === this.bankCertificate) {
                dataArray.bankCertificate = res
              }

              if (item.model === this.holdingLetter) {
                dataArray.holdingLetter = res

              }
              let bank = {
                banco: {
                  nombre_banco: this.profile_bank.bank,
                  numero_cuenta: this.profile_bank.account,
                  nombre_titular: this.profile_bank.name,
                  cedula_titular: this.profile_bank.id,
                  tipo_cuenta: this.profile_bank.account_type,
                  img_certificacion: dataArray.bankCertificate == null ? './assets/imgs/no_photo.png' : dataArray.bankCertificate,
                  img_tenencia: dataArray.holdingLetter == null ? './assets/imgs/no_photo.png' : dataArray.holdingLetter
                }
              }

              console.log('dataArray' + dataArray)

              if (index == indexArray - 1) {
                this.fire.saveImageProfilePath(dataArray, userID)
                  .then(res => {
                    this.auth.saveUrl(bank).then(response => {
                      console.log(response, 'response')
                    })
                    console.log('save image path' + res)
                  })
                  .catch(e => {
                    console.error('Error dont save image path' + e)
                  })
                this.alert.showAlert('', 'Se han guardado los datos correctamente')
              }
            })
            .catch(e => {
              console.error('error upload ' + e)
              if (index == indexArray - 1) {
                this.alert.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')
              }
            })
        })
        this.auth.bankData(this.profile_bank)
          .then(res => {
            console.log(JSON.stringify(res))
            this.alert.showAlert('Datos bancarios para pagos de anticipo', 'Se ha guardado correctamente')
            // this.navCtrl.setRoot('home-drive')
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
      console.log('-ProfileBank- StepForm 1')
      console.log('--ProfileBank-- saveBank profile_bank: ', this.profile_bank)
      // this.bankForm0.controls['equal'].setValue(false)
      // this.bankForm0.controls['checknequi_balance'].setValue(false)
      // this.bankForm0.controls['checkbank_balance'].setValue(false)
      this.profile_bank.paso = 2
      console.log('--ProfileBank-- saveBank this.bankForm0.controls[checknequi_balance].value: ', this.bankForm0.controls['checknequi_balance'].value)
      console.log('--ProfileBank-- saveBank this.bankForm0.controls[phone_balance].value ', this.bankForm0.controls['phone_balance'].value)
      console.log('--ProfileBank-- this.bankForm0.controls[name_beneficiary_balance].value ', this.bankForm0.controls['name_beneficiary_balance'].value)
      console.log('--ProfileBank-- this.bankForm0.controls[id_beneficiary_balance].value ', this.bankForm0.controls['id_beneficiary_balance'].value)
      console.log('--ProfileBank-- saveBank his.user.pago_saldo: ', this.user.pago_saldo)

      if (this.bankForm0.controls['checknequi_balance'].value === true
        && this.bankForm0.controls['phone_balance'].value != '' && this.bankForm0.controls['phone_balance'].value != this.user.pago_saldo.billetera.numero_celular
        && this.bankForm0.controls['name_beneficiary_balance'].value != '' && this.bankForm0.controls['name_beneficiary_balance'].value != this.user.pago_saldo.billetera.nombre_beneficiario
        && this.bankForm0.controls['id_beneficiary_balance'].value != '' && this.bankForm0.controls['id_beneficiary_balance'].value != this.user.pago_saldo.billetera.identificacion_beneficiario
      ) {
        console.log('--ProfileBank-- saveBank Entro a checknequi')
        console.log('--ProfileBank-- saveBank this.bankForm0.controls[name_beneficiary_balance].value: ', this.bankForm0.controls['name_beneficiary_balance'].value)
        console.log('--ProfileBank-- saveBank this.bankForm0.controls[id_beneficiary_balance].value: ', this.bankForm0.controls['id_beneficiary_balance'].value)

        this.profile_bank.phone = this.bankForm0.controls['phone_balance'].value
        this.profile_bank.name_beneficiary = this.bankForm0.controls['name_beneficiary_balance'].value
        this.profile_bank.id_beneficiary = this.bankForm0.controls['id_beneficiary_balance'].value
        this.profile_bank.bank = ''
        this.profile_bank.account = ''
        this.profile_bank.account_type = ''
        this.profile_bank.type = 1
        console.log('--ProfileBank-- saveBank profile_bank: ', this.profile_bank)
        this.auth.bankData(this.profile_bank)
          .then(res => {
            console.log(JSON.stringify(res))
            this.alert.showAlert('Datos bancarios para pagos de saldos', 'Se ha guardado correctamente')
            this.navCtrl.setRoot('home-drive')
          })
          .catch(error => {
            console.log(error)
            this.alert.showAlert('Error', 'Ocurrio un error, intente de nuevo')
          })
        console.log(this.profile_bank)
      }
      if (this.bankForm0.controls['checkbank_balance'].value === true
        && this.bankForm0.controls['bank_balance'].value != '' && this.bankForm0.controls['bank_balance'].value != this.user.pago_saldo.banco.nombre_banco
        && this.bankForm0.controls['account_balance'].value != '' && this.bankForm0.controls['account_balance'].value != this.user.pago_saldo.banco.numero_cuenta
        && this.bankForm0.controls['name_balance'].value != '' && this.bankForm0.controls['name_balance'].value != this.user.pago_saldo.banco.nombre_titular
        && this.bankForm0.controls['id_balance'].value != '' && this.bankForm0.controls['id_balance'].value != this.user.pago_saldo.banco.cedula_titular
        && this.bankForm0.controls['account_type_balance'].value != '' && this.bankForm0.controls['account_type_balance'].value != this.user.pago_saldo.banco.tipo_cuenta
      ) {
        console.log('--ProfileBank-- saveBank Entro a checkbank')
        const userID = await this.getUserId()
        this.profile_bank.phone = ''
        this.profile_bank.name_beneficiary = ''
        this.profile_bank.id_beneficiary = ''


        this.profile_bank.bank = this.bankForm0.controls['bank_balance'].value
        this.profile_bank.account = this.bankForm0.controls['account_balance'].value
        this.profile_bank.name = this.bankForm0.controls['name_balance'].value
        this.profile_bank.id = this.bankForm0.controls['id_balance'].value
        this.profile_bank.account_type = this.bankForm0.controls['account_type_balance'].value
        this.profile_bank.type = 2

        let arrayImgs = []
        if (this.bankCertificate_balance != this.nophonto) {
          console.log('entre al primer if')
          arrayImgs.push({
            model: this.bankCertificate_balance,
            id: userID,
            name: 'bankCertificate_balance'
          })
        }

        if (this.holdingLetter_balance != this.nophonto) {
          console.log('entre al segundo if')
          arrayImgs.push({
            model: this.holdingLetter_balance,
            id: userID,
            name: 'holdingLetter_balance'
          })
        }

        console.log(arrayImgs, 'array')

        const indexArray = arrayImgs.length
        let dataArray = {
          bankCertificate_balance: null,
          holdingLetter_balance: null
        }
        arrayImgs.forEach((item, index) => {
          this.fire.uploadPicture(item.model, item.id, item.name)
            .then(res => {
              console.log(res, 'response arrayImgs')
              if (item.model === this.bankCertificate_balance) {
                dataArray.bankCertificate_balance = res
              }

              if (item.model === this.holdingLetter) {
                dataArray.holdingLetter_balance = res

              }
              let bank = {
                banco: {
                  nombre_banco: this.profile_bank.bank,
                  numero_cuenta: this.profile_bank.account,
                  nombre_titular: this.profile_bank.name,
                  cedula_titular: this.profile_bank.id,
                  tipo_cuenta: this.profile_bank.account_type,
                  img_certificacion: dataArray.bankCertificate_balance == null ? './assets/imgs/no_photo.png' : dataArray.bankCertificate_balance,
                  img_tenencia: dataArray.holdingLetter_balance == null ? './assets/imgs/no_photo.png' : dataArray.holdingLetter_balance
                }
              }

              console.log('dataArray' + dataArray)

              if (index == indexArray - 1) {
                this.fire.saveImageProfilePath(dataArray, userID)
                  .then(res => {
                    this.auth.saveUrl(bank).then(response => {
                      console.log(response, 'response')
                    })
                    console.log('save image path' + res)
                  })
                  .catch(e => {
                    console.error('Error dont save image path' + e)
                  })
                this.alert.showAlert('', 'Se han guardado los datos correctamente')
              }
            })
            .catch(e => {
              console.error('error upload ' + e)
              if (index == indexArray - 1) {
                this.alert.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')
              }
            })
        })
        console.log('--ProfileBank-- saveBank datos a enviar PROFILE_BANK: ', this.profile_bank)
        this.auth.bankData(this.profile_bank)
          .then(res => {
            console.log(JSON.stringify(res))
            this.alert.showAlert('Datos bancarios para pagos de saldos', 'Se ha guardado correctamente')
            this.navCtrl.setRoot('home-drive')
          })
          .catch(error => {
            console.log(error)
            this.alert.showAlert('Error', 'Ocurrio un error, intente de nuevo')
          })
        console.log(this.profile_bank)

      }
      this.scrollToTop()
      this.navCtrl.setRoot('home-drive')

    }


  }


  scrollToTop() {
    this.content.scrollToTop()
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
            console.log('cancel clicked');
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
            console.log(data, 'data res')
            const photo = data.cropResult
            if (modelPicture === 'bankCertificate') {
              this.bankCertificate = photo;

            } else if (modelPicture === 'holdingLetter') {
              this.holdingLetter = photo

            }

          }
        })
        modal.present()
      }).catch(e => {
        console.error(e)
      })
  }

  checkselectNequi() {
    if (this.bankForm.controls['checknequi'].value === true) {
      this.bankForm.controls['checkbank'].setValue(false)
      this.show_nequi = 1
      this.show_bank = 0
      // this.bankForm.controls['bank'].setValue('')
      // this.bankForm.controls['account'].setValue('')
      // this.bankForm.controls['name'].setValue('')
      // this.bankForm.controls['id'].setValue('')
      // this.bankForm.controls['account_type'].setValue('')
    } else if (this.bankForm.controls['checknequi'].value === false) {
      this.bankForm.controls['checkbank'].setValue(true)
      this.show_nequi = 0
      this.show_bank = 1
      // this.bankForm.controls['phone'].setValue('')
      // this.bankForm.controls['name_beneficiary'].setValue('')
      // this.bankForm.controls['id_beneficiary'].setValue('')
    }
  }

  checkselectBank() {
    if (this.bankForm.controls['checkbank'].value === true) {
      this.bankForm.controls['checknequi'].setValue(false)
      this.show_nequi = 0
      this.show_bank = 1
      this.disableBank = false
      // this.bankForm.controls['phone'].setValue('')
      // this.bankForm.controls['name_beneficiary'].setValue('')
      // this.bankForm.controls['id_beneficiary'].setValue('')
    } else if (this.bankForm.controls['checkbank'].value === false) {
      this.bankForm.controls['checknequi'].setValue(true)
      this.show_nequi = 1
      this.show_bank = 0
      // this.bankForm.controls['bank'].setValue('')
      // this.bankForm.controls['account'].setValue('')
      // this.bankForm.controls['name'].setValue('')
      // this.bankForm.controls['id'].setValue('')
      // this.bankForm.controls['account_type'].setValue('')
    }
  }

  checkselectNequi_balance() {
    if (this.bankForm0.controls['checknequi_balance'].value === true) {
      console.log('--ProfileBank-- checkselectNequi_balance TRUE')
      this.bankForm0.controls['equal'].setValue(false)
      console.log('--ProfileBank-- checkselectNequi_balance checkbank_balance: ', this.bankForm0.controls['checkbank_balance'].value)
      this.bankForm0.controls['checkbank_balance'].setValue(false)
      this.show_nequi_balance = 1
      this.show_bank_balance = 0
      this.disablenequi_balance = false
      this.bankForm0.controls['phone_balance'].setValue('')
      this.bankForm0.controls['name_beneficiary_balance'].setValue('')
      this.bankForm0.controls['id_beneficiary_balance'].setValue('')

    } else if (this.bankForm0.controls['checknequi_balance'].value === false) {
      console.log('--ProfileBank-- checkselectNequi_balance FALSE')
      this.bankForm0.controls['checkbank_balance'].setValue(true)
      this.show_nequi_balance = 0
      this.show_bank_balance = 1
      this.disablenequi_balance = true
      this.bankForm0.controls['bank_balance'].setValue('')
      this.bankForm0.controls['account_balance'].setValue('')
      this.bankForm0.controls['name_balance'].setValue('')
      this.bankForm0.controls['id_balance'].setValue('')
      this.bankForm0.controls['account_type_balance'].setValue('')
    }
  }

  checkselectBank_balance() {
    if (this.bankForm0.controls['checkbank_balance'].value === true) {
      console.log('--ProfileBank-- checkselectBank_balance TRUE')
      this.bankForm0.controls['equal'].setValue(false)
      console.log('--ProfileBank-- checkselectNequi_balance checkbank_balance: ', this.bankForm0.controls['checkbank_balance'].value)
      this.bankForm0.controls['checknequi_balance'].setValue(false)
      this.show_nequi_balance = 0
      this.show_bank_balance = 1
      this.disableBank_balance = false
    } else if (this.bankForm0.controls['checkbank_balance'].value === false) {
      console.log('--ProfileBank-- checkselectBank_balance FALSE')
      this.bankForm0.controls['checknequi_balance'].setValue(true)
      this.show_nequi_balance = 1
      this.show_bank_balance = 0
      this.disableBank_balance = true
    }
  }

  checkselectequal() {
    if (this.bankForm0.controls['equal'].value === true) {
      console.log('--ProfileBank-- checkselectequal TRUE')
      this.bankForm0.controls['equal'].setValue(true)
      this.profile_bank.equal = true
      this.disableBank_balance = true
      this.disablenequi_balance = true
      this.getDriver()
      console.log('--ProfileBank-- checkselectequal driver: ', this.driver)
      console.log('--ProfileBank-- checkselectequal user: ', this.user)

      if (this.driver.pago_anticipo != undefined && this.driver.pago_anticipo.billetera.numero_celular.length > 0) {
        this.bankForm0.controls['checknequi_balance'].setValue(true)
        this.bankForm0.controls['checkbank_balance'].setValue(false)
        this.show_nequi_balance = 1
        this.show_bank_balance = 0
        this.disableBank_balance = true
        this.disablenequi_balance = true
        console.log('--ProfileBank-- checkselectequal show_nequi_balance: ', this.show_nequi_balance)
        console.log('--ProfileBank-- checkselectequal show_bank_balance: ', this.show_bank_balance)
        this.bankForm0.controls['phone_balance'].setValue(this.driver.pago_anticipo.billetera.numero_celular)
        this.bankForm0.controls['name_beneficiary_balance'].setValue(this.driver.pago_anticipo.billetera.nombre_beneficiario)
        this.bankForm0.controls['id_beneficiary_balance'].setValue(this.driver.pago_anticipo.billetera.identificacion_beneficiario)
      } else if (this.driver.pago_anticipo.banco.nombre_banco.length > 0) {
        this.bankForm0.controls['checknequi_balance'].setValue(false)
        this.bankForm0.controls['checkbank_balance'].setValue(true)
        this.show_nequi_balance = 0
        this.show_bank_balance = 1
        this.disableBank_balance = true
        this.disablenequi_balance = true
        console.log('--ProfileBank-- this.driver.pago_anticipo.banco show_nequi_balance_balance: ', this.show_nequi_balance)
        console.log('--ProfileBank-- this.driver.pago_anticipo.banco show_bank_balance_balance: ', this.show_bank_balance)
        this.bankForm0.controls['bank_balance'].setValue(this.driver.pago_anticipo.banco.nombre_banco)
        this.bankForm0.controls['account_balance'].setValue(this.driver.pago_anticipo.banco.numero_cuenta)
        this.bankForm0.controls['name_balance'].setValue(this.driver.pago_anticipo.banco.nombre_titular)
        this.bankForm0.controls['id_balance'].setValue(this.driver.pago_anticipo.banco.cedula_titular)
        this.bankForm0.controls['account_type_balance'].setValue(this.driver.pago_anticipo.banco.tipo_cuenta)
      }

    } else if (this.bankForm0.controls['equal'].value === false) {
      console.log('--ProfileBank-- checkselectequal FALSE')
      this.profile_bank.equal = false
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
      this.show_nequi_balance = 0
      this.show_bank_balance = 0
      this.disablenequi_balance = false
      this.disableBank_balance = false
    }

  }


}
