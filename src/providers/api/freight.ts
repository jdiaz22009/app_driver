import { Injectable } from '@angular/core'

import qs from 'qs'

import { ApiClientProvider } from './apiClient'

import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'

@Injectable()
export class FreightProvider{

  // api_url: string = CONFIG.api.url + ':' + CONFIG.api.port
  api_url: string = CONFIG.api.url

  get_path: string = CONFIG.api.offer.get
  getById_path: string = CONFIG.api.offer.getById
  get_new_path: string = CONFIG.api.offer.new
  getMy_offers_path: string = CONFIG.api.offer.myOffers
  getDriversMy_offers_path: string = CONFIG.api.offer.getDriverMyOffers
  postulate_path: string = CONFIG.api.offer.postulate
  push_path: string = CONFIG.api.push.postPush
  updateOffert_path: string = CONFIG.api.offer.updateOffer

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

  async getDriverMyOffers(){
    const url = this.api_url + this.getDriversMy_offers_path
    const token = await this.getToken()
    const headers = {'Authorization' : token, 'content-type': 'application/json' }
    try{
      return await this.apiClient.request('GET', url, null, headers)
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

  async pushToOffer(authod_id, offer_id){
    const url = this.api_url + this.push_path + '/' + 2 + '/' + authod_id
    const token = await this.getToken()
    const headers = {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded' }

    const params = qs.stringify({
      id: offer_id,
      titulo: 'Nuevo Oferente',
      cuerpo: 'Conductor postulado'
    })

    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }
  }



  /**
   * 
   * @param {string} id - offer id
   * @param {string} state -
     * Asignación aceptada  '6'
     * En Camino a Cargar   '7'
     * En origen            '8'
     * Cargando             '9'
     * En tránsito          '13'
     * En destino           '14'
     * Descargando          '15'
     * Descargado           '16'
     * Cumplido enviado     '17'
     * Cumplido aprobado    '18'
     * Calificación Empresa '19'
   *  
   */
  async updateOfferState(id, state){

    const url = this.api_url + this.updateOffert_path + '/' + id
    const token = await this.getToken()
    const headers = {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded'}   

    const params = qs.stringify({
      id: state,
      type: 2
    })

    try{
      return await this.apiClient.request('PUT', url, params, headers)
    }catch(e){
      throw e
    }
  }


}
