import { Injectable } from '@angular/core'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import axios from 'axios'
import qs from 'qs'

import { User } from '../models/user'
import { Register } from '../models/register'
import { CONFIG } from './config'


@Injectable()
export class AuthProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port
  login_path: string = CONFIG.api.path.login
  register_driver_path: string = CONFIG.api.drivers.register

  constructor(
    
  ){

  }

  async validateId(id: Number){
    if(id === 16648049){
      return true
    }else{
      return false
    }
  }

  async login(user: User){   
    const url = this.api_url + this.login_path
    const params = qs.stringify({
      documento: user.id,
      contrasena: user.password,
      firetoken: 0,
      type: 0
    })
    try{
      return await this.post(url, params)
    }catch(e){
      throw e
    }
  }

  async register(register: Register){

  }

  async logout(){    
    return true
  }  

  async post(url, params){
    try{
      return await axios.post(url, params)      
    }catch(e){
      throw e
    }
  }
}