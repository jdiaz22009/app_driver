import { Injectable } from '@angular/core'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import qs from 'qs'

import { CONFIG } from '../config'

import { User } from '@models/user'


import { ApiClientProvider } from './apiClient'
import { StorageDb } from '../storageDb'

@Injectable()
export class CompanyAuthProvider{

  constructor(
    public apiClient: ApiClientProvider,
    public db: StorageDb){
    
  }

  async validateId(id: Number){
    if(id === 123456){
    return {data:  {code: 100}}
    }      
    return {data:  {code: 101}}
  }

  async login(user: User){   
    if(user.id === 123456 && user.password === '123456'){
      return {data:  {code: 100}}
    }
    return {data:  {code: 101}}
  }

  async register(register){
    return ''
  }

  async logout(){
    return ''
  }


}