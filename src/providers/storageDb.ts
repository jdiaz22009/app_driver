import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'

@Injectable()
export class StorageDb{        

    constructor(private storage: Storage){
        
    }        

    setItem(key, value){
        this.storage.set(key, value);
    }

    getItem(key){
        return this.storage.get(key);
    }
    deleteDB(){
        this.storage.clear();
    }
}
