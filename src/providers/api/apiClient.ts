import { Injectable } from '@angular/core'

import axios from 'axios'
@Injectable()
export class ApiClientProvider{

  constructor(){

  }
  async get(url, params, headers){
    console.log(url + '  params: ' + params + ' headers: ' + headers)
    try{
      if(params !== null && headers === null) {
        return axios.get(url, params)
      }else if(params === null && headers !== null){
        return axios.get(url, headers)
      }else{
        return axios.get(url)
      }
    }catch(e){
      throw e
    }
  }
  async post(url, params, headers){

    const options = {
      method: 'POST',
      headers: headers,
      data: params,
      url,
    }
    try{
      return await axios(options)      
    }catch(e){
      throw e
    }
  }
}