import { Injectable } from '@angular/core'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import qs from 'qs'

import { CONFIG } from '../config'

import { User } from '@models/user'
import { RegisterDriver } from '@models/registerDriver'

import { ApiClientProvider } from './apiClient'
import { StorageDb } from '../storageDb'

@Injectable()
export class DriverAuthProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port
  
  login_path: string = CONFIG.api.drivers.login
  validateId_path: string = CONFIG.api.drivers.validateId
  register_driver_path: string = CONFIG.api.drivers.register

  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb
  ){

  }
  async validateId(id: Number){
    const url = this.api_url + this.validateId_path + '/' + id
    try{
       return await this.apiClient.get(url, null) 
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
    const headers = {'content-type': 'application/x-www-form-urlencoded' }
    try{
      return await this.apiClient.post(url, params, headers)
    }catch(e){
      throw e
    }
  }
  async register(register: RegisterDriver){
    const url = this.api_url + this.register_driver_path
    const params = qs.stringify({
      primer_nombre: register.first_name,
      segundo_nombre: register.second_name,
      primer_apellido: register.first_lastname,
      segundo_apellido: register.second_lastname,
      documento: register.id,
      celular: register.mobil,
      direccion: register.address,
      telefono_1: register.phone,
      email: register.email,
      contrasena: register.password,            
      firetoken: 0,
      type: 0      
    })
    const headers = {'content-type': 'application/x-www-form-urlencoded' }
    try{
      return await this.apiClient.post(url, params, headers)
    }catch(e){
      throw e
    }
  }

  async logout(){    
    return await this.db.deleteDB()    
  }  
}