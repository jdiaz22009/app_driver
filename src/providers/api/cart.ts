import { Injectable } from '@angular/core'

import qs from 'qs'

import { ApiClientProvider } from './apiClient'

import { Cart } from '@models/cart'

import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'

@Injectable()
export class CartProvider {

  // api_url: string = CONFIG.api.url + ':' + CONFIG.api.port
  api_url: string = CONFIG.api.url

  add_path: string = CONFIG.api.cart.add
  getClass_path: string = CONFIG.api.cart.getClass
  getVehicles_path: string = CONFIG.api.cart.getVehicles
  updateVehicle_path: string = CONFIG.api.cart.updateVehicle
  getMyVehicle_path: string = CONFIG.api.cart.getMyVehicle
  getMySelected_path: string = CONFIG.api.cart.getMySelect
  inService_path: string = CONFIG.api.cart.updateVehicle
  removeVehicle_path: string = CONFIG.api.cart.deleteVehicle

  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb
  ) {

  }

  async getToken() {
    const token = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
      return res.token
    })
    return token
  }

  async add(cart: Cart) {
    const url = this.api_url + this.add_path

    const token = await this.getToken()

    const params = qs.stringify({
      placa: cart.license_plate,
      clase_vehiculo: cart.type,
      tipo_carroceria: cart.bodywork,
      modelo: cart.model,
      marca: cart.brand
    })
    const headers = { 'Authorization': token, 'content-type': 'application/x-www-form-urlencoded' }

    try {
      return await this.apiClient.request('POST', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async getVehicleClass() {
    const url = this.api_url + this.getClass_path
    try {
      return await this.apiClient.get(url, null, null)
    } catch (e) {
      throw e
    }
  }

  async getVehicleById(id) {
    const url = this.api_url + this.getMyVehicle_path + '/' + id
    const token = await this.getToken()

    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('GET', url, null, headers)
    } catch (e) {
      throw e
    }

  }

  async updateVehicle(cart, id) {
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()

    const params = {
      placa: cart.license_plate,
      clase_vehiculo: cart.type,
      tipo_carroceria: cart.bodywork,
      modelo: cart.model,
      marca: cart.brand
    }

    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  // TODO: Additonal information vehicle Form1... by mosco, sorry perafo
  async updateVehicleAddInfo1(cart, id) {
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()
    const params = {
      motor: cart.engine,
      repotenciado: cart.power,
      chasis: cart.chassis,
      combustible: cart.gas,
      configuracion: cart.configuration,
      color: cart.color,
      peso_vacio: cart.weight,
      capacidad: cart.capacity,
      tipo_servicio: cart.service_type,
      pais: cart.country
    }
    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  // TODO: Additonal information vehicle Form2... by mosco, sorry perafo
  async updateVehicleAddInfo2(cart, id) {
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()

    const params = {
      importacion: cart.import_declaration,
      numero_soat: cart.soat,
      vencimiento_soat: cart.soat_expiration,
      nit_soat: cart.soat_company_id,
      numero_tecnicomecanica: cart.technical_review,
      vencimiento_tecnicomecanica: cart.technical_review_expiration,
      trailer: cart.trailer,
      trailer_marca: cart.trailer_brand,
      trailer_modelo: cart.trailer_model,
      trailer_placa: cart.trailer_plate
    }
    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  // TODO: Additonal information vehicle Form3... by mosco, sorry perafo
  async updateVehicleAddInfo3(cart, id) {
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()

    const params = {
      empresa_gps: cart.gps_company,
      pagina_gps: cart.gps_company_web,
      id_gps: cart.gps_id,
      usuario_gps: cart.gps_user,
      clave_gps: cart.gps_password
    }
    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  // TODO: Add owner... by mosco, sorry perafo
  async updateVehicleAddOwnerNat(cart, id) {
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()
    const params = {
      prop_tipo_persona: cart.owner_type,
      prop_tipo_identificacion: cart.owner_id_type,
      prop_identificacion: cart.owner_id,
      prop_primer_nombre: cart.owner_first_name,
      prop_segundo_nombre: cart.owner_second_name,
      prop_primer_apellido: cart.owner_first_lastname,
      prop_segundo_apellido: cart.owner_second_lastname,
      prop_pais : cart.owner_country,
      prop_departamento : cart.owner_department,
      prop_municipio: cart.owner_state,
      prop_direccion: cart.owner_address,
      prop_celular: cart.owner_mobil,
      prop_telefono: cart.owner_phone,
      prop_email : cart.owner_email,
      propietario : cart.owner,
      tenedor : cart.fork_info
    }
    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async updateVehicleAddOwnerJur(cart, id) {
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()
    const params = {
      prop_razon_social: cart.owner_business_name,
      prop_nit: cart.owner_nit,
      prop_pais: cart.owner_country,
      prop_departamento: cart.owner_department,
      prop_municipio_negocio: cart.owner_municipality,
      prop_direccion_negocio: cart.owner_address,
      prop_celular_negocio: cart.owner_mobile,
      prop_telefono_negocio: cart.owner_phone,
      prop_repre_primer_nombre: cart.owner_first_name_legal_rep,
      prop_repre_segundo_nombre: cart.owner_second_name_legal_rep,
      prop_repre_primer_apellido: cart.owner_surname_legal_rep,
      prop_repre_segundo_apellido: cart.owner_second_surname_legal_rep,
      prop_repre_documento: cart.owner_number_id_legal_rep,
      prop_repre_celular: cart.owner_phone_legal_rep,
      prop_repre_email: cart.owner_email_legal_rep,
      propietario : cart.owner,
      tenedor : cart.fork_info
    }
    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async updateVehicleImages(imgArray, id){
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()

    const params = {
      vehiclesImages:{
        vehicleFront: imgArray.vehicleFront === null ? '' : imgArray.vehicleFront,
        vehicleBack: imgArray.vehicleBack === null ? '' : imgArray.vehicleBack,
        vehicleRight: imgArray.vehicleRight === null ? '' : imgArray.vehicleRight,
        vehicleLeft: imgArray.vehicleLeft === null ? '' : imgArray.vehicleLeft,
        vehicleCab: imgArray.vehicleCab === null ? '' : imgArray.vehicleCab
      }
    }

    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async updateVehicleHolderImages(imgArray, id){
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()

    const params = {
      ownerImages:{
        holderLetter: imgArray.holderLetter === null ? '' : imgArray.holderLetter
      }
    }

    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  // async updateBankInformationImages(imgArray, id){
  //   const url = this.api_url + this.updateVehicle_path + '/' + id
  //   const token = await this.getToken()

  //   const params = {
  //     bankInformation:{
  //       advanceAutorization: imgArray.advanceAutorization === null ? '' : imgArray.advanceAutorization ,
  //       advanceCertificate: imgArray.advanceCertificate === null ? '' : imgArray.advanceCertificate ,
  //       advanceLetter: imgArray.advanceLetter === null ? '' : imgArray.advanceLetter ,
  //       balanceAutorization: imgArray.balanceAutorization === null ? '' : imgArray.balanceAutorization ,
  //       balanceCertificate: imgArray.balanceCertificate === null ? '' : imgArray.balanceCertificate ,
  //       balanceLetter: imgArray.balanceLetter === null ? '' : imgArray.balanceLetter
  //     }
  //   }

  //   const headers = { 'Authorization': token, 'content-type': 'application/json' }

  //   try {
  //     return await this.apiClient.request('PUT', url, params, headers)
  //   } catch (e) {
  //     throw e
  //   }
  // }

  async updateVehiclesDocumentationImages(imgArray, id){
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()

    const params = {
      vehiclesDocumentation:{
        vehicleLicenseFront: imgArray.vehicleLicenseFront === null ? '' : imgArray.vehicleLicenseFront,
        vehicleLicenseRear: imgArray.vehicleLicenseRear === null ? '' : imgArray.vehicleLicenseRear,
        trailerLicenseFront: imgArray.trailerLicenseFront === null ? '' : imgArray.trailerLicenseFront,
        trailerLicenseBack: imgArray.trailerLicenseBack === null ? '' : imgArray.trailerLicenseBack,
        soatFront: imgArray.soatFront === null ? '' : imgArray.soatFront,
        soatBack: imgArray.soatBack === null ? '' : imgArray.soatBack,
        tecnoFront: imgArray.tecnoFront === null ? '' : imgArray.tecnoFront,
        tecnoBack: imgArray.tecnoBack === null ? '' : imgArray.tecnoBack
      }
    }

    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }


  async getVehiclesList() {
    const url = this.api_url + this.getVehicles_path
    const token = await this.getToken()
    const headers = { 'Authorization': token, 'content-type': 'application/x-www-form-urlencoded' }
    try {
      return await this.apiClient.request('GET', url, null, headers)
    } catch (e) {
      throw e
    }
  }

  async getMySelected() {
    const url = this.api_url + this.getMySelected_path
    const token = await this.getToken()
    const headers = { 'Authorization': token, 'content-type': 'application/json' }

    try {
      return await this.apiClient.request('GET', url, null, headers)
    } catch (e) {
      throw e
    }
  }

  async setInService(state, id) {
    const url = this.api_url + this.inService_path + '/' + id

    const token = await this.getToken()

    const params = {
      state: state,
    }

    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  async removeVehicle(id){
    const url = this.api_url + this.removeVehicle_path + '/' + id

    const token = await this.getToken()

    const headers = { 'Authorization': token, 'content-type': 'application/json' }
    try {
      return await this.apiClient.request('DELETE', url, null, headers)
    } catch (e) {
      throw e
    }


  }

}
