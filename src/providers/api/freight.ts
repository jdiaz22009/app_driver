import { Injectable } from '@angular/core'

import qs from 'qs'

import { ApiClientProvider } from './apiClient'

import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'

@Injectable()
export class FreightProvider{

  api_url: string = CONFIG.api.url

  get_path: string = CONFIG.api.offer.get
  getById_path: string = CONFIG.api.offer.getById
  get_new_path: string = CONFIG.api.offer.new
  getMy_offers_path: string = CONFIG.api.offer.myOffers
  getDriversMy_offers_path: string = CONFIG.api.offer.getDriverMyOffers
  postulate_path: string = CONFIG.api.offer.postulate
  push_path: string = CONFIG.api.push.postPush
  updateOffert_path: string = CONFIG.api.offer.updateOffer
  ordenCargue_path: String = CONFIG.api.offer.ordenCargue
  getfilters_path: String = CONFIG.api.offer.getfilters
  offerLoad_path: String = CONFIG.api.offer.offerLoad
  offerCumplido_path: String = CONFIG.api.offer.offerCumplido
  qualifyCompany_path: String = CONFIG.api.offer.qualifyCompany
  offerTracking_path: String = CONFIG.api.offer.offerTracking
  rejectOffer_path: String = CONFIG.api.offer.rejectOffer

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

  async getOffertByFilters(filters){

    const userId = await this.getUserId()
    const url = this.api_url + this.getfilters_path + '/' +  userId
    const token = await this.getToken()

    const headers = {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded' }

    const params = qs.stringify({
      clase_vehiculo: filters.type,
      tipo_carroceria: filters.bodywork,
      ciudad_origen: filters.origin,
      ciudad_destino: filters.destination,
      fecha_creacion: filters.date
    })

    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }
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

  async updateOfferOrdenCargue(id){
    const url = this.api_url + this.ordenCargue_path + '/' + id
    const token = await this.getToken()
    const headers = {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded'}
    try{
      return await this.apiClient.request('PUT', url, null, headers)
    }catch(e){
      throw e
    }
  }

  async saveOfferLoad(offertId, load){
    const url = this.api_url + this.offerLoad_path + '/' + offertId
    const token = await this.getToken()
    const headers = {'Authorization' : token, 'content-type': 'application/json' }

    const params = {
      photo_cargue: load
    }
    console.log('params post ' + JSON.stringify(params))
    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }
  }

  async saveOfferCumplido(offertId, load){
    const url = this.api_url + this.offerLoad_path + '/' + offertId
    const token = await this.getToken()
    const headers = {'Authorization' : token, 'content-type': 'application/json' }

    const params = {
      photo_cumplido: load
    }
    console.log('params post ' + JSON.stringify(params))
    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }
  }

  async saveQualifyCompany(offertId, authorId, qualify, comment){
    const url = this.api_url + this.qualifyCompany_path + '/' + authorId
    const token = await this.getToken()
    const userId = await this.getUserId()
    const headers = {'Authorization' : token, 'content-type': 'application/json' }

    const params = {
      oferta: offertId,
      conductor: userId,
      calificacion: qualify,
      comentario: comment
    }
    console.log('params post ' + JSON.stringify(params))
    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }
  }

  async getOfferTracking(){
    const url = this.api_url + this.offerTracking_path
    const token = await this.getToken()
    const headers = {'Authorization' : token, 'content-type': 'application/json' }
    try{
      return await this.apiClient.request('GET', url, null, headers)
    }catch(e){
      return e
    }
  }

  async rejectOffer(id){
    const url = this.api_url + this.rejectOffer_path + '/' + id
    const token = await this.getToken()
    const userId = await this.getUserId()
    const headers = {'Authorization' : token, 'content-type': 'application/json' }
    const params = {
      idConductor: userId
    }
    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      return e
    }
  }

}
