import { Injectable } from '@angular/core'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import { User } from '../models/user'

@Injectable()
export class AuthProvider{

  constructor(
    
  ){

  }

  async getUser(){
    return ''
  }

  async validateId(id: Number){
    if(id === 9876543){
      return true
    }else{
      return false
    }
  }

  async login(user: User){    
    try{  
      if(user.id === 9876543 && user.password === '123456') {
        return true
      }else{
        return false
      }            
    }catch(e){      
      throw e
    } 
  }

  async logout(){    
    return true
  }  

}