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
    return ''
  }

  async login(user: User){   
    return ''
  }

  async register(register){
    return ''
  }

  async logout(){
    return ''
  }


}