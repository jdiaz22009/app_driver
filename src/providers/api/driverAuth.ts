import { Injectable } from '@angular/core'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import qs from 'qs'

import { CONFIG } from '../config';

import { User } from '@models/user'
import { RegisterDriver } from '@models/registerDriver'

import { ApiClientProvider } from './apiClient'
import { StorageDb } from '../storageDb'

@Injectable()
export class DriverAuthProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port
  getDrivers:String = CONFIG.api.drivers.getDrivers;
  login_path: string = CONFIG.api.drivers.login
  validateId_path: string = CONFIG.api.drivers.validateId
  register_driver_path: string = CONFIG.api.drivers.register
  inService_path: string = CONFIG.api.drivers.setInServices



  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb
  ){

  }

  async getToken(){
    const token = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{      
      return res.token
    })
    console.log(token);
    return token
  }
  async getDriver (){
    const url = this.api_url + this.getDrivers
    const tokenUser =  await this.getToken()
    .then(resp => {
      return resp;
    })

  
    const headers = { headers:{'Authorization' : tokenUser, 'content-type': 'application/json' }}
    try {
      return  this.apiClient.get(url, null, headers)
      .then(result => {console.log('RESULT TRY GETDRIVER',result)})
      .catch(error => {console.log('ERROR TRYGETDRIVER',error)});
    } catch (error) {
      throw error;
    }
    
  
    
      
  }

  async validateId(id: Number){
    const url = this.api_url + this.validateId_path + '/' + id
    try{
       return await this.apiClient.get(url, null, null) 
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
  async setInService(state, vehicle){
    const url = this.api_url + this.inService_path
    
    const token = await this.getToken()

    const params = qs.stringify({
      inservice: state,
      inservice_vehicle: vehicle,      
    })
    const headers = {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded' }
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