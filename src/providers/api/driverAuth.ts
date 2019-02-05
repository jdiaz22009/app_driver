import { Injectable } from '@angular/core'
import { Platform } from 'ionic-angular'

import qs from 'qs'

import { CONFIG } from '../config'

import { User } from '@models/user'
import { RegisterDriver } from '@models/registerDriver'

import { ApiClientProvider } from './apiClient'
import { StorageDb } from '@providers/storageDb'

@Injectable()
export class DriverAuthProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port

  getDriver_path: string = CONFIG.api.drivers.getDrivers
  login_path: string = CONFIG.api.drivers.login
  verify_token_path: string = CONFIG.api.path.verify
  validateId_path: string = CONFIG.api.drivers.validateId
  register_driver_path: string = CONFIG.api.drivers.register
  inService_path: string = CONFIG.api.drivers.setInServices
  updatedrivers_path:string = CONFIG.api.drivers.updateConductor

  api_url_dev: string = CONFIG.api.urldev + ':' + CONFIG.api.port
  getDevDrivers:string = CONFIG.dev.getDrivers
  login_path_dev: string = CONFIG.dev.login
  validateId_path_dev:string = CONFIG.dev.validateId
  register_driver_parth_dev: string = CONFIG.dev.register
  inService_path_dev:string = CONFIG.dev.setInServices
  updatedrivers_dev:string = CONFIG.dev.updateConductor

  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb,
    public plt: Platform
  ){

  }

  async getToken(){
     const token = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
       return res.token
     })
     return token != null ? token : ''
  }

  async getFireToken(){
    try{
      const token = await this.db.getItem(CONFIG.localdb.USER_FIRETOKEN)
      return token != null ? token : 'no token'
    }catch(e){
      throw e
    }
  }

  async verifyToken(){
    const token = await this.getToken()
    console.log('token to verify ' + token)
    const url = this.api_url +  this.verify_token_path
    const headers = { headers: {'Authorization' : token, 'content-type': 'application/x-www-form-urlencoded'} }
    try{
      return await this.apiClient.request('POST', url, null, headers )
    }catch(e){
      throw e
    }

  }

  async getOSType(){
    if (this.plt.is('ios')) {
      return 'ios'
    }else if(this.plt.is('android')){
      return 'android'
    }else if(this.plt.is('mobileweb')){
      return 'web'
    }else{
      return 'unknown'
    }
  }

  async getDriver (){
    const url =  this.api_url + this.getDriver_path
    const token = await this.getToken();
    const dataUserJson = JSON.parse(token);
    console.log(dataUserJson.token)
    console.log('token verificar: ', dataUserJson)
    const headers = {headers:{'Authorization' : dataUserJson.token, 'content-type': 'application/json'} }
    // const params = { headers: {"Authorization" : token.token} }
    try{
      return await this.apiClient.get(url, null, headers)
    }catch(e){
      throw e
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

    const firetoken = await this.getFireToken()
    const osType = await this.getOSType()

    const url = this.api_url + this.login_path

    const params = qs.stringify({
      documento: user.id,
      contrasena: user.password,
      firetoken: firetoken,
      type: osType
    })

    const headers = {headers:{'content-type': 'application/x-www-form-urlencoded'} }

    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }
  }

  async register(register: RegisterDriver, rol: number){

    const firetoken = await this.getFireToken()
    const osType = await this.getOSType()

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
      firetoken: firetoken,
      type: osType,
      rol
    })

    const headers = {'content-type': 'application/x-www-form-urlencoded' }

    try{
      return await this.apiClient.request('POST', url, params, headers)
    }catch(e){
      throw e
    }
  }

  async setInService(state, vehicle){
    const url = this.api_url + this.inService_path

    const token = await this.getToken()
    const dataUserJson = JSON.parse(token)

    const params = qs.stringify({
      inservice: state,
      inservice_vehicle: vehicle,
    })

    const headers = {'Authorization' : dataUserJson.token, 'content-type': 'application/x-www-form-urlencoded' }
    try{
      return await this.apiClient.request('POST' ,url, params, headers)
    }catch(e){
      throw e
    }
  }

   async upatedrivers(driver){
     const url = this.api_url + '/api/v1/auth/conductores/update-datosB'

     console.log(url);
     const token = await this.getToken()
     console.log('token',token);
     const dataUserJson = JSON.parse(token);
     const params = {
       primer_nombre: driver.first_name,
       segundo_nombre: driver.second_name,
       primer_apellido: driver.first_lastname,
       segundo_apellido: driver.second_lastname,
       celular: driver.mobil
     }
     const headers = {headers:{'Authorization' : dataUserJson.token, 'content-type': 'application/json'} }
     console.log(driver,'update drivers');
     try {
       return await this.apiClient.request('PUT', url,params,headers)
     } catch (e) {
       throw e
     }


  }

  async logout(){
    return await this.db.deleteDB()
  }

}
