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

  // async getToken(){
  //   const token = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{      
  //     return res.token
  //   })
  //   return token
  // }

  getToken =async()=>await localStorage.getItem('dataUser');  

  async getOffert(){
    const url = this.api_url + this.get_path
    const dataUser = await this.getToken();    
    const dataUserJson = JSON.parse(dataUser);
    const headers = { headers: {'Authorization' : dataUserJson.token, 'content-type': 'application/json' }}
    // const params = { headers: {"Authorization" : token.token} }
    try{
      return await this.apiClient.get(url, null, headers)
    }catch(e){
      throw e
    }
  }

  newOffert(){

  }
  
}
