import { Injectable } from '@angular/core'

import qs from 'qs'

import { ApiClientProvider } from './apiClient'

import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'

@Injectable()
export class FreightProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port

  get_path: string = CONFIG.api.offer.get
  get_new_path: string = CONFIG.api.offer.new
  getMy_offers_path: string = CONFIG.api.offer.myOffers
  postulate_path: string = CONFIG.api.offer.postulate

  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb){

  }

  async getToken(){
    const token = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      return res.token
    })
    return token
  }

  async getUser(){
    const user = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      return res.user
    })
    return user
  }

  async getOffert(){
    const url = this.api_url + this.get_path
    const token = await this.getToken()
    const headers = { headers: {'Authorization' : token, 'content-type': 'application/json' }}
    try{
      return await this.apiClient.get(url, null, headers)
    }catch(e){
      throw e
    }
  }

  newOffert(){

  }

  async getMyOffers(){
    const url = this.api_url + this.getMy_offers_path
    const token = await this.getToken()
    const headers = { headers: {'Authorization' : token, 'content-type': 'application/json' }}
    try{
      return await this.apiClient.get(url, null, headers)
    }catch(e){
      throw e
    }
  }

  async postulateToOffer(id){
    const url = this.api_url + this.postulate_path
    const token = await this.getToken()
    const user = await this.getUser()
    const headers = { headers: {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded' }}

    const params = qs.stringify({
      id_offers: id,
      id: user
    })

    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }

  }

}
