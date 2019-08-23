import { Injectable } from '@angular/core'
import { Platform } from 'ionic-angular'

import { FCM } from "@ionic-native/fcm"

import qs from 'qs'

import { CONFIG } from '../config'

import { User } from '@models/user'
import { RegisterDriver } from '@models/registerDriver'
import { DataUserC } from '@models/dataUserC'

import { ApiClientProvider } from './apiClient'
import { StorageDb } from '@providers/storageDb'

@Injectable()
export class DriverAuthProvider {

  api_url: string = CONFIG.api.url

  getDriver_path: string = CONFIG.api.drivers.getDrivers
  login_path: string = CONFIG.api.drivers.login
  verify_token_path: string = CONFIG.api.drivers.verifyToken
  validateId_path: string = CONFIG.api.drivers.validateId
  register_driver_path: string = CONFIG.api.drivers.register
  inService_path: string = CONFIG.api.drivers.setInServices
  updatedrivers_path: string = CONFIG.api.drivers.updateDriver
  driverUrl_path: string = CONFIG.api.drivers.wayTopay
  create_reference: string = CONFIG.api.drivers.create_reference
  save_url: string = CONFIG.api.drivers.saveUrl
  coming_soon: string = CONFIG.api.drivers.comingSoon
  offerCount: string = CONFIG.api.drivers.offerCount
  acceptOffer: string = CONFIG.api.offer.acceptOffer
  canceltOffer: string = CONFIG.api.offer.canceltOffer

  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb,
    public plt: Platform,
    public fcm: FCM
  ) {

  }

  async getToken() {
    const token = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
      return res.token
    })
    return token != null ? token : ''
  }

  async getUserId(){
    return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      return res.userId
    })

  }

  async getFireToken() {
    try {
      // const token = await this.db.getItem(CONFIG.localdb.USER_FIRETOKEN)
      // return token != null ? token : 'no token'
     return await this.fcm.getToken()

    } catch (e) {
      throw e
    }
  }

  async verifyToken() {
    const token = await this.getToken()
    const url = this.api_url + this.verify_token_path
    const headers = { headers: { 'Authorization': token, 'content-type': 'application/x-www-form-urlencoded' } }
    try {
      return await this.apiClient.request('POST', url, null, headers)
    } catch (e) {
      throw e
    }

  }

  async getOSType() {
    if (this.plt.is('ios')) {
      return 'ios'
    } else if (this.plt.is('android')) {
      return 'android'
    } else if (this.plt.is('mobileweb')) {
      return 'web'
    } else {
      return 'unknown'
    }
  }

  async validateId(id: Number) {
    const url = this.api_url + this.validateId_path + '/' + id
    try {
      return await this.apiClient.get(url, null, null)
    } catch (e) {
      throw e
    }
  }

  async login(user: User) {

    const firetoken = await this.getFireToken()
    const osType = await this.getOSType()

    const url = this.api_url + this.login_path

    const params = qs.stringify({
      documento: user.id,
      contrasena: user.password,
      firetoken: firetoken,
      type: osType
    })

    const headers = { headers: { 'content-type': 'application/x-www-form-urlencoded' } }

    try {
      return await this.apiClient.request('POST', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async register(register: RegisterDriver, rol: number) {

    const firetoken = await this.getFireToken()
    const osType = await this.getOSType()

    const url = this.api_url + this.register_driver_path

    const params = qs.stringify({
      primer_nombre: register.first_name,
      segundo_nombre: register.second_name,
      primer_apellido: register.first_lastname,
      segundo_apellido: register.second_lastname,
      documento: register.id,
      celular: register.mobil,
      direccion: register.address,
      telefono_1: register.phone,
      email: register.email,
      contrasena: register.password,
      firetoken: firetoken,
      type: osType,
      rol
    })

    const headers = { 'content-type': 'application/x-www-form-urlencoded' }

    try {
      return await this.apiClient.request('POST', url, params, headers)
    } catch (e) {
      throw e
    }
  }


  async setInService(state, vehicle) {
    const url = this.api_url + this.inService_path

    const token = await this.getToken()

    const params = {
      inservice: state,
      inservice_vehicle: vehicle,
    }

    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('POST', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async getDriver() {
    const url = this.api_url + this.getDriver_path
    const token = await this.getToken()
    const headers = { headers: { 'Authorization': token, 'content-type': 'application/json' } }
    try {
      return await this.apiClient.get(url, null, headers)
    } catch (e) {
      throw e
    }

  }

  async upatedrivers(driver) {
    const url = this.api_url + this.updatedrivers_path
    const token = await this.getToken()

    const params = {
      documento: driver.id,
      primer_nombre: driver.first_name,
      segundo_nombre: driver.second_name,
      primer_apellido: driver.first_lastname,
      segundo_apellido: driver.second_lastname,
      celular: driver.mobil,
      email: driver.email
    }
    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async updateDriverC(driver: DataUserC) {
    const url = this.api_url + this.updatedrivers_path
    const token = await this.getToken()

    const params = {
      fecha_expedicion_cedula: driver.fecha_expedicion_cedula,
      lugar_expedicion_cedula: driver.lugar_expedicion_cedula,
      pais: driver.pais,
      departamento: driver.departamento,
      ciudad: driver.ciudad,
      direccion: driver.direccion,
      telefono_1: driver.telefono_1,
      fecha_nacimiento: driver.fecha_nacimiento,
      lugar_nacimiento: driver.lugar_nacimiento,
      nombre_arl: driver.nombre_arl,
      nombre_eps: driver.nombre_eps,
      nombre_fondo: driver.nombre_fondo,
      numero_licencia_conducir: driver.numero_licencia_conducir,
      categoria_licencia: driver.categoria_licencia,
      vencimiento_licencia: driver.vencimiento_licencia,
      tipo_sangre: driver.tipo_sangre,
      genero: driver.genero
    }

    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }
  async updateBankInformationPhotos(imgArray) {
    const url = this.api_url + this.updatedrivers_path
    const token = await this.getToken()

    const params = {
      bankInformation:{
        advanceAutorization: imgArray.advanceAutorization === null ? '' : imgArray.advanceAutorization,
        advanceAutorization1: imgArray.advanceAutorization1 === null ? '' : imgArray.advanceAutorization1,
        advanceCertificate: imgArray.advanceCertificate === null ? '' : imgArray.advanceCertificate,
        advanceLetter: imgArray.advanceLetter === null ? '' : imgArray.advanceLetter,
        advanceLetter1: imgArray.advanceLetter1 === null ? '' : imgArray.advanceLetter1,
        balanceAutorization: imgArray.balanceAutorization === null ? '' : imgArray.balanceAutorization,
        balanceAutorization1: imgArray.balanceAutorization1 === null ? '' : imgArray.balanceAutorization1,
        balanceCertificate: imgArray.balanceCertificate === null ? '' : imgArray.balanceCertificate,
        balanceLetter: imgArray.balanceLetter === null ? '' : imgArray.balanceLetter,
        balanceLetter1: imgArray.balanceLetter1 === null ? '' : imgArray.balanceLetter1
      }
    }

    console.log(JSON.stringify(params))
    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }


  async updateDriverMyPhotos(imgArray) {
    const url = this.api_url + this.updatedrivers_path
    const token = await this.getToken()

    const params = {
      myPhotos: {
        idFront: imgArray.idFront === null ? '' : imgArray.idFront,
        idBack: imgArray.idBack === null ? '' : imgArray.idBack,
        licenseFront: imgArray.licenseFront === null ? '' : imgArray.licenseFront,
        licenseBack: imgArray.licenseBack === null ? '' : imgArray.licenseBack,
        driverImg: imgArray.driverImg === null ? '' : imgArray.driverImg
      }

    }

    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async updateDriverRef(driver: DataUserC) {
    const url = this.api_url + this.updatedrivers_path
    const token = await this.getToken()

    const params = {
      ref_nombre1: driver.ref_nombre1,
      ref_empresa1: driver.ref_empresa1,
      ref_telefono1: driver.ref_telefono1,
      ref_nombre2: driver.ref_nombre2,
      ref_empresa2: driver.ref_empresa2,
      ref_telefono2: driver.ref_telefono2,
      ref_nombre3: driver.ref_nombre3,
      ref_empresa3: driver.ref_empresa3,
      ref_telefono3: driver.ref_telefono3

    }

    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async bankData(data) {
    const url = this.api_url + this.driverUrl_path
    const token = await this.getToken()

    if (data.type == 1) {
      const params = {
        type: data.type,
        numero_celular: data.phone,
        nombre_beneficiario: data.name_beneficiary,
        identificacion_beneficiario: data.id_beneficiary,
        paso: data.paso,
        igual_anticipo : data.equal
      }
      const headers = { 'Authorization': token, 'content-type': 'application/json' }
      try {
        return await this.apiClient.request('POST', url, params, headers)
      } catch (e) {
        throw e
      }

    } else if (data.type == 2) {
      const params = {
        type: data.type,
        nombre_banco: data.bank,
        numero_cuenta: data.account,
        nombre_titular: data.name,
        cedula_titular: data.id,
        numero_celular: data.phone,
        tipo_cuenta: data.account_type,
        img_certificacion: data.img_certificacion,
        img_tenencia: data.img_tenencia,
        paso: data.paso,
        igual_anticipo : data.equal
      }
      const headers = { 'Authorization': token, 'content-type': 'application/json' }
      try {
        return await this.apiClient.request('POST', url, params, headers)
      } catch (e) {
        throw e
      }
    }

  }

  async driverReference(params) {
    const url = this.api_url + this.create_reference
    const token = await this.getToken()
    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('POST', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async saveUrl(params) {
    const url = this.api_url + this.save_url
    const token = await this.getToken()
    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (error) {
      throw error

    }
  }

  async ComingSoon(params) {
    const url = this.api_url + this.coming_soon
    const token = await this.getToken()
    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('POST', url, params, headers)
    } catch (error) {
      throw error
    }

  }

  async logout() {
    return await this.db.deleteDB()
  }

  async getOfferCount() {

    const token = await this.getToken()
    const url = this.api_url + this.offerCount
    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('GET', url, null, headers)
    } catch (e) {
      throw e
    }
  }

  async acceptTheOffer(offerId){

    const token = await this.getToken()
    const userId = await this.getUserId()
    const url = this.api_url + this.acceptOffer + `/${offerId}/${userId}`
    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, null, headers)
    } catch (e) {
      throw e
    }
  }

  async cancelTheOffer(offerId){

    const token = await this.getToken()
    const userId = await this.getUserId()
    const url = this.api_url + this.canceltOffer + `/${offerId}/${userId}`
    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, null, headers)
    } catch (e) {
      throw e
    }
  }

}
