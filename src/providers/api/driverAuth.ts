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
  api_url_dev: string = CONFIG.api.urldev + ':' + CONFIG.api.port
  getDrivers:String = CONFIG.api.drivers.getDrivers;
  getDevDrivers:string = CONFIG.dev.getDrivers;
  login_path: string = CONFIG.api.drivers.login
  login_path_dev: string = CONFIG.dev.login
  validateId_path: string = CONFIG.api.drivers.validateId
  validateId_path_dev:string = CONFIG.dev.validateId
  register_driver_path: string = CONFIG.api.drivers.register
  register_driver_parth_dev: string = CONFIG.dev.register;
  inService_path: string = CONFIG.api.drivers.setInServices
  inService_path_dev:string = CONFIG.dev.setInServices
  updatedrivers_dev:string = CONFIG.dev.updateConductor
  



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

  //getToken =async()=>await localStorage.getItem('dataUser');  

  async getDriver (){
    const url = this.api_url_dev + this.getDevDrivers
    const token = await this.getToken();    
    //const dataUserJson = JSON.parse(dataUser);
    const headers = { headers: {'Authorization' : token, 'content-type': 'application/json' }}
    // const params = { headers: {"Authorization" : token.token} }
    try{
      return await this.apiClient.get(url, null, headers)
    }catch(e){
      throw e
    }
      
  }



  async validateId(id: Number){
    const url = this.api_url_dev + this.validateId_path_dev + '/' + id
    try{
       return await this.apiClient.get(url, null, null) 
    }catch(e){
      throw e
    }    
  }

  async login(user: User){   
    const url = this.api_url_dev + this.login_path_dev
    const params = qs.stringify({
      documento: user.id,
      contrasena: user.password,
      firetoken: 0,
      type: 0
    })
    const headers = {headers:{'content-type': 'application/x-www-form-urlencoded'} }
    try{
      return await this.apiClient.post(url, params, headers)
    }catch(e){
      throw e
    }
  }
  async register(register: RegisterDriver){
    const url = this.api_url_dev + this.register_driver_parth_dev
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
    const url = this.api_url_dev + this.inService_path_dev
    
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
  
   async upatedrivers(driver){
     const url = this.api_url_dev + '/api/v1/auth/conductores/update-datosB';
     console.log(url);
     const token = await this.getToken()
     //const dataUserJson = JSON.parse(token);
     const params = {
       primer_nombre: driver.first_name,
       segundo_nombre: driver.second_name,
       primer_apellido: driver.first_lastname,
       segundo_apellido: driver.second_lastname,
       celular: driver.mobil
     }
     const headers = {'Authorization' : token, 'content-type': 'application/json' }
     console.log(driver,'update drivers');
     try {
       return await this.apiClient.put(url,params,headers);
      
     } catch (error) {
       throw error
     }
    
    
  }
  async logout(){    
    return await this.db.deleteDB()    
  }

}