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
  getMyVehicle_path: string = CONFIG.api.cart.getMyVehicle

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
      marca: cart.model,
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

}
