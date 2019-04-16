import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, ModalController } from 'ionic-angular'
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

  bankForm: FormGroup
  checknequi: boolean;
  checkbank: boolean;
  disablenequi: boolean;
  disableTel: boolean;
  profile_bank: any = {}
  nophonto: string = './assets/imgs/no_photo.png'
  bankCertificate: string = this.nophonto
  holdingLetter: string = this.nophonto

  show_nequi: number = 0
  show_bank: number = 0
  user: any

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


    this.bankForm = this.formBuilder.group({
      phone: ['', Validators.compose([
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
    this.user = this.navParams.get('profile')
    console.log('--ProfileBank-- USER: ', this.user)
    console.log('--ProfileBank-- USER: ', this.user.nequi.numero_celular.length)
    if (this.user != null) {
      if (this.user.nequi.numero_celular.length > 0) {
        this.checknequi = true
        this.checkbank = false
        this.show_nequi = 1
        this.show_bank = 0
        this.disableTel = false
        this.disablenequi = true
        this.bankForm.controls['phone'].setValue(this.user.nequi.numero_celular)
      } else if (this.user.banco) {
        this.checknequi = false
        this.checkbank = true
        this.show_nequi = 0
        this.show_bank = 1
        this.bankForm.controls['bank'].setValue(this.user.banco.nombre_banco)
        this.bankForm.controls['account'].setValue(this.user.banco.numero_cuenta)
        this.bankForm.controls['name'].setValue(this.user.banco.nombre_titular)
        this.bankForm.controls['id'].setValue(this.user.banco.cedula_titular)
        this.bankForm.controls['account_type'].setValue(this.user.banco.tipo_cuenta)
      }

    }


  }


  async getUserId() {
    const id = await this.db.getItem(CONFIG.localdb.USER_KEY)
      .then(res => {
        return res.userId
      })
    return id
  }



  checkselectNequi() {
    if (this.checknequi == true) {
      this.checkbank = false
      this.show_nequi = 1
      this.show_bank = 0
      this.disableTel = false
      this.disablenequi = true
    } else if (this.checknequi == false) {
      this.show_nequi = 0

    }
  }

  checkselectBank() {
    if (this.checkbank == true) {
      this.checknequi = false
      this.show_nequi = 0
      this.show_bank = 1
      this.disableTel = true
      this.disablenequi = false
    } else if (this.checkbank == false) {
      this.show_bank = 0
    }

  }


  async saveBank() {
    const loader = this.loadingCtrl.create({})
    loader.present()

    console.log('--ProfileBank-- saveBank checknequi: ', this.checknequi)
    console.log('--ProfileBank-- saveBank checkbank: ', this.checkbank)
    console.log('--ProfileBank-- saveBank Phone: ', this.bankForm.controls['phone'].value)
    if (this.checknequi == true) {
      console.log('--ProfileBank-- saveBank Entro a checknequi')
      this.profile_bank.phone = this.bankForm.controls['phone'].value
      this.profile_bank.bank = ''
      this.profile_bank.account = ''
      this.profile_bank.name = ''
      this.profile_bank.id = ''
      this.profile_bank.account_type = ''
      this.profile_bank.type = 1
      this.auth.bankData(this.profile_bank)
        .then(res => {
          console.log(JSON.stringify(res))
          loader.dismiss()

          this.alert.showAlert('Datos nequi', 'Se ha guardado correctamente')
          this.navCtrl.setRoot('home-drive')


        })
        .catch(error => {
          console.log(error)
          loader.dismiss()
          this.alert.showAlert('Error', 'Ocurrio un error, intente de nuevo')
        })
      console.log(this.profile_bank)
    }
    if (this.checkbank == true) {
      console.log('--ProfileBank-- saveBank Entro a checkbank')
      const loader = this.loadingCtrl.create({})
      loader.present()
      const userID = await this.getUserId()
      this.profile_bank.phone = ''
      this.profile_bank.bank = this.bankForm.controls['bank'].value
      this.profile_bank.account = this.bankForm.controls['account'].value
      this.profile_bank.name = this.bankForm.controls['name'].value
      this.profile_bank.id = this.bankForm.controls['id'].value
      this.profile_bank.account_type = this.bankForm.controls['account_type'].value
      this.profile_bank.type = 2

      this.auth.bankData(this.profile_bank)
        .then(res => {
          loader.dismiss()
          this.alert.showAlert('Datos de Banco', 'Se ha guardado correctamente')
          console.log(JSON.stringify(res))
          this.navCtrl.setRoot('home-drive')
        })
        .catch(error => {
          console.log(error)
          loader.dismiss()
          this.alert.showAlert('Error', 'Ocurrio un error, intente de nuevo')
        })

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

            console.log('dataArray' + dataArray)

            if (index == indexArray - 1) {
              this.fire.saveImageProfilePath(dataArray, userID)
                .then(res => {
                  console.log('save image path' + res)
                })
                .catch(e => {
                  console.error('Error dont save image path' + e)
                  if (index == indexArray - 1) {
                    this.alert.showAlert('Error', 'Ha ocurrido un problema, por favor intente de nuevo')

                  }
                })
              loader.dismiss()
              this.alert.showAlert('', 'Se han guardado los datos correctamente')

            }
          })
      })
    }

  }

  onViewDidLoad() {
    this.getProfileBankPicture()
  }

  async getProfileBankPicture() {
    const loader = this.loadingCtrl.create({})
    loader.present();
    const userID = await this.getUserId();
    this.fire.getProfilePicture(userID)
      .then(res => {
        console.log(res, 'res')
        if (res['bankCertificate'] !== undefined) {
          this.bankCertificate = res['bankCertificate']
        }

        if (res['holdingLetter'] !== undefined) {
          this.holdingLetter = res['holdingLetter']
        }
      })
      .catch(e => {
        loader.dismiss()
        console.error('Error' + e)
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

          } else {
            console.error('Error')
          }
        })
        modal.present()
      })
      .catch(e => {
        console.error(e)
      })
  }




}
