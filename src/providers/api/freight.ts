import { Injectable } from '@angular/core'

import { ApiClientProvider } from './apiClient'

import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'

@Injectable()
export class FreightProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port

  get_path: string = CONFIG.api.offer.get
  get_new: string = CONFIG.api.offer.new

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

}
