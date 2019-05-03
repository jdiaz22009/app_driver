import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { CONFIG } from '@providers/config'
import { StorageDb } from '@providers/storageDb'
import { FreightProvider } from '@providers/api/freight'

@IonicPage()
@Component({
  selector: 'my-freight-driver',
  templateUrl: 'my-freight.html'
})
export class MyFreightDriverPage {

  allOffers: any = []
  assignedOffers: any = []
  historyOffers: any = []

  listType: string


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: StorageDb,
    public offer: FreightProvider
    ) {


  }

  ionViewDidLoad(){
    this.listType = 'all'
    this.getMyOffers()
  }

  async getUserId(){
    const id = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
       return res.userId
     })
     return id
   }

  async getMyOffers(){

    const userId = await this.getUserId()
    this.offer.getDriverMyOffers().then(res =>{
      // console.log(JSON.stringify(res))
      const data = res['data']['data']

      if(data.length > 0){
        for(let i of data){
          if(i['driverselected'] !== undefined
            && i['driverselected'] !== null
            && i['driverselected'].length > 0 ){

              for(let y of i['driverselected']){
                if(y._id === userId){
                  this.assignedOffers.push(i)
                }else{
                  this.allOffers.push(i)
                }
              }

          }else{
            this.allOffers.push(i)
          }
        }
     }
    })
  }

  freightDetails(freight){
    this.navCtrl.push('DetailsFreightDriverPage', { id: freight._id, mode: 1})
  }

  freight(freight){
    this.navCtrl.push('ProgressFreightDriverPage', { id: freight._id})
  }


}
