import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'

@Injectable()
export class StorageDb{        

    constructor(private storage: Storage){
        
    }        

    async setItem(key, value){
        return await this.storage.set(key, value)
    }

    async getItem(key){
        return await this.storage.get(key)
    }

    async deleteDB(){
        return await this.storage.clear()
    }
}
