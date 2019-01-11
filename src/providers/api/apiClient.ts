import { Injectable } from '@angular/core'

import axios from 'axios'
@Injectable()
export class ApiClientProvider{

  constructor(){

  }
  async get(url, params){
    console.log(url + 'params: ' + params)
    try{
      if(params != null) {
        return axios.get(url, params)
      }else{
        return axios.get(url)
      }
    }catch(e){
      throw e
    }
  }
  async post(url, params){
    console.log(url + 'params: ' + params)
    try{
      return await axios.post(url, params)      
    }catch(e){
      throw e
    }
  }
}