import { Injectable } from '@angular/core'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import axios from 'axios'
import qs from 'qs'

import { User } from '../models/user'
import { Register } from '../models/register'
import { CONFIG } from './config';


@Injectable()
export class AuthProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port
  login_path: string = CONFIG.api.path.login
  validateId_path: string = CONFIG.api.path.validateId
  register_driver_path: string = CONFIG.api.drivers.register

  constructor(
    
  ){

  }

  async validateId(id: Number){
    const url = this.api_url + this.validateId_path + '/' + id
    try{
       return await this.get(url, null) 
    }catch(e){
      throw e
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
    const url = this.api_url + this.register_driver_path
    const params = qs.stringify({
      email: register.email,
      contrasena: register.password,
      nombres: register.first_name + ' ' + register.second_name,
      apellidos: register.first_lastname + ' ' + register.second_lastname,
      documento: register.id,
      firetoken: 0,
      type: 0      
    })
  }

  async logout(){    
    return true
  }  

  async get(url, params){
    console.log(url)
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
    try{
      return await axios.post(url, params)      
    }catch(e){
      throw e
    }
  }
}