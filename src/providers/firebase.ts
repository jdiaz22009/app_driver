import { Injectable } from '@angular/core'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

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
      const task = imgRef.putString(data, 'base64', {contentType:'image/jpg'})
      task.on(
        'state_changed',
        snapshot => {
            const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
            console.log(percentage)
        },
        error => {
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
    const imgRef = this.database.ref(`drivers/${id}`)
    return new Promise((resolve, reject) =>{
      imgRef.once('value', (snap)=>{
        console.log(snap.val(),'snap de Picture')
        resolve(snap.val())
      }, (e) =>{
        reject(e)
      })
    })
   }

}
