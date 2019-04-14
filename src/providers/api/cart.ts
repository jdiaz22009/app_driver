import { Injectable } from '@angular/core'

import qs from 'qs'

import { ApiClientProvider } from './apiClient'

import { Cart } from '@models/cart'

import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'

@Injectable()
export class CartProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port

  add_path: string = CONFIG.api.cart.add
  getClass_path: string = CONFIG.api.cart.getClass
  getVehicles_path: string = CONFIG.api.cart.getVehicles
  updateVehicle_path: string = CONFIG.api.cart.updateVehicle
  getMyVehicle_path: string = CONFIG.api.cart.getMyVehicle
  getMySelected_path: string = CONFIG.api.cart.getMySelect
  inService_path: string = CONFIG.api.cart.updateVehicle

  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb
    ){

  }

  async getToken(){
    const token = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      return res.token
    })
    return token
  }

  async add(cart: Cart){
    const url = this.api_url + this.add_path

    const token = await this.getToken()

    const params = qs.stringify({
      placa: cart.license_plate,
      clase_vehiculo: cart.type,
      tipo_carroceria: cart.bodywork,
      modelo: cart.model,
      marca: cart.brand
    })
    const headers = {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded' }

    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }
  }

  async getVehicleClass(){
    const url = this.api_url + this.getClass_path
    try{
      return await this.apiClient.get(url, null, null)
    }catch(e){
      throw e
    }
  }

  async getVehicleById(id){
    const url = this.api_url + this.getMyVehicle_path + '/' + id
    const token = await this.getToken()

    const headers = {'Authorization' : token, 'content-type': 'application/json'}

    try {
      return await this.apiClient.request('GET', url, null, headers)
    } catch (e) {
      throw e
    }

  }

  async updateVehicle(cart, id){
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()

    const params = {
      placa: cart.license_plate,
      clase_vehiculo: cart.type,
      tipo_carroceria: cart.bodywork,
      modelo: cart.model,
      marca: cart.brand
    }

    const headers = {'Authorization' : token, 'content-type': 'application/json'}

    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  // TODO: Additonal information vehicle Form1... by mosco, sorry perafo
  async updateVehicleAddInfo1(cart, id){
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()
    const params = {
      motor: cart.engine,
      //repotenciado
      chasis: cart.chassis,
      combustible: cart.gas,
      configuracion: cart.configuration,
      color: cart.color,
      peso_vacio: cart.weight,
      capacidad: cart.capacity,
      tipo_servicio: cart.service_type,
      pais: cart.country
    }
    const headers = {'Authorization' : token, 'content-type': 'application/json'}
    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

  // TODO: Additonal information vehicle Form2... by mosco, sorry perafo
  async updateVehicleAddInfo2(cart, id){
    const url = this.api_url + this.updateVehicle_path + '/' + id
    const token = await this.getToken()

    const params = {
      importacion: cart.import_declaration,
      numero_soat: cart.soat,
      vencimiento_soat: cart.soat_expiration,
      nit_soat: cart.soat_company_id,
      numero_tecnicomecanica: cart.technical_review,
      vencimiento_tecnicomecanica: cart.technical_review_expiration
      // ,trailer: cart.xxxxxxx
    }
    const headers = {'Authorization' : token, 'content-type': 'application/json'}
    try {
      return await this.apiClient.request('PUT', url, params, headers)
    } catch (e) {
      throw e
    }
  }

// TODO: Additonal information vehicle Form3... by mosco, sorry perafo
async updateVehicleAddInfo3(cart, id){
  const url = this.api_url + this.updateVehicle_path + '/' + id
  const token = await this.getToken()

  const params = {
    empresa_gps: cart.gps_company,
    pagina_gps: cart.gps_company_web,
    id_gps: cart.gps_id,
    usuario_gps: cart.gps_user,
    clave_gps: cart.gps_password
  }
  const headers = {'Authorization' : token, 'content-type': 'application/json'}
  try {
    return await this.apiClient.request('PUT', url, params, headers)
  } catch (e) {
    throw e
  }
}


  async getVehiclesList(){
    const url = this.api_url + this.getVehicles_path
    const token = await this.getToken()
    const headers = { 'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded'}
    try{
      return await this.apiClient.request('GET', url, null, headers)
    }catch(e){
      throw e
    }
  }

  async getMySelected(){
    const url = this.api_url + this.getMySelected_path
    const token = await this.getToken()
    const headers = { 'Authorization' : token, 'content-type': 'application/json'}

    try{
      return await this.apiClient.request('GET', url, null, headers)
    }catch(e){
      throw e
    }
  }

  async setInService(state, id){
    const url = this.api_url + this.inService_path + '/'+ id

    const token = await this.getToken()

    const params = {
      state: state,
    }

    const headers = { 'Authorization': token , 'content-type': 'application/json'}
    try{
      return await this.apiClient.request('PUT' ,url, params, headers)
    }catch(e){
      throw e
    }
  }

}
