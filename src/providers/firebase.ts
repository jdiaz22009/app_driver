import { Injectable } from '@angular/core'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

import { MediaFirebase } from '@models/mediaFirebase'


@Injectable()
export class FirebaseProvider{

  database: any
  driverRef: any
  storage: any
  imgRef: any

   constructor(){

      this.database = firebase.database()
      this.driverRef = this.database.ref('/drivers')

      this.storage = firebase.storage()

   }

   uploadPicture(data, id, name){

    const imgRef = this.storage.ref(`drivers/${id}/${name}`)
     return new Promise((resolve, reject) =>{
      //  const task = imgRef.putString(data, 'data_url')

      imgRef.putString(data, 'data_url').then(res =>{
        resolve(res)
      }).catch(e => {
        console.error(e)
        reject(e)
      })
     })

   }

   getProfilePicture(id){
    const imgRef = this.storage.ref(`drivers/${id}`)
    return new Promise((resolve, reject) =>{
      imgRef.once('value')
    })
   }

   setDriverData(media: MediaFirebase){
    this.driverRef.push(media)
   }

   async getDriverData(){
     const getPromise = new Promise((resolve, reject)=>{
        this.driverRef.on('value', (snap) =>{
          console.log(snap.val())
          resolve(snap.val())
        }, (e) =>{
          console.error(e)
          reject(e)
        })
     })
     return await getPromise
   }

   updateDriverData(id){

   }
}
