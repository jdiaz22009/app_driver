import { Injectable } from '@angular/core'

import qs from 'qs'

import { ApiClientProvider } from './apiClient'

import { CONFIG } from '../config'

import { Cart } from '../../models/cart'

@Injectable()
export class CartProvider{
  
  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port

  add_path: string = CONFIG.api.cart.add
  getClass_path: string = CONFIG.api.cart.getClass

  constructor(public apiClient: ApiClientProvider){
    
  }

  async add(cart: Cart){
    const url = this.api_url + this.add_path
    const params = qs.stringify({
      placa: cart.license_plate,
      clase_vehiculo: cart.type,
      tipo_carroceria: cart.bodywork,
      modelo: cart.model,
      marca: cart.model
    })
    try{
      return await this.apiClient.post(url, params)
    }catch(e){
      throw e
    }
  }

  async getVehicleClass(){
    const url = this.api_url + this.getClass_path
    try{
      return await this.apiClient.get(url, null)
    }catch(e){
      throw e
    }
  }
  
}