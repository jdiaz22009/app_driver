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
      const task = imgRef.putString(data, 'data_url')
      task.on(
        'state_changed',
        snapshot => {
            const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
            console.log(percentage)
        },
        error => {
            console.error(error.message)
            reject(error)
        },
        () => {
            imgRef.getDownloadURL().then(resUrl => {
                resolve(resUrl)
            })
        }
      )
    })

   }

   async saveImageProfilePath(data, userId){
    return await this.database.ref(`drivers/${userId}`).set(data)
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
