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
    return firebase.auth().currentUser
  }

  async login(user: User){    
    try{  
      const result =  '' 
      return result      
    }catch(e){      
      throw e
    } 
  }

  async logout(){    
    return firebase.auth().signOut()
  }  

   recoveryPassword(email){
     return new Promise((resolve, reject) =>{
      firebase.auth().sendPasswordResetEmail(email).then(()=>{
        resolve()
      }).catch(e =>{
        reject(e)
      })
     })   
  }
}