import { Injectable } from '@angular/core'

import { ApiClientProvider } from './apiClient'

import { CONFIG } from '../config';
import { StorageDb } from '../storageDb';

@Injectable()
export class FreightProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port

  get_path: string = CONFIG.api.offer.get
  get_new: string = CONFIG.api.offer.new

  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb){

  }

  async getOffert(){
    const url = this.api_url + this.get_path
    const token = await this.getToken();
    console.log(token.token)
    const params = { headers: {"Authorization" : token.token} }
    try{
      return await this.apiClient.get(url, params)
    }catch(e){
      throw e
    }
  }

  newOffert(){

  }

  async getToken(){
    const data = await this.db.getItem(CONFIG.localdb.USER_KEY)
    return data;
  }
}
