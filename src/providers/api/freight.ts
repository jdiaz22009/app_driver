import { Injectable } from '@angular/core'

import qs from 'qs'

import { ApiClientProvider } from './apiClient'

import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'

@Injectable()
export class FreightProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port

  get_path: string = CONFIG.api.offer.get
  getById_path: string = CONFIG.api.offer.getById
  get_new_path: string = CONFIG.api.offer.new
  getMy_offers_path: string = CONFIG.api.offer.myOffers
  postulate_path: string = CONFIG.api.offer.postulate
  push_path: string = CONFIG.api.push.postPush
  updateOffert_path: string = CONFIG.api.offer.updateOfferState

  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb){

  }

  async getSessionData(){
    const sessionData = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      return res
    })
    return sessionData
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

  async getUserId(){
    const userId = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      return res.userId
    })
    return userId
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
    const userId = await this.getUserId()
    const headers = {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded' }

    const params = qs.stringify({
      id_offers: id,
      id: userId
    })

    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }

  }

  async getOfferById(id){
    const url = this.api_url + this.getById_path + '/' + id
    const token = await this.getToken()
    const headers = { headers:{'Authorization' : token, 'content-type': 'application/json'} }

    try{
      return await this.apiClient.request('GET', url, null, headers)
    }catch(e){
      throw e
    }
  }

  async pushToOffer(){
    const url = this.api_url + this.push_path
    const token = await this.getToken()
    const userId = await this.getUserId()
    const headers = {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded' }

    const params = {
      rol: 4 ,
      titulo: 'Nuevo Oferente',
      cuerpo: userId
    }

    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }
  }

  async updateOfferState(id){

    const url = this.api_url + this.updateOffert_path
    const token = await this.getToken()
    const headers = { headers:{'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded'} }

    const params = qs.stringify({
      type: 'conductor postulado',
      offerid: id,
    })

    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }

  }
}
