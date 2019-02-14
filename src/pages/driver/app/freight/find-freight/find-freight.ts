import { CONFIG } from '@providers/config';
import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import 'rxjs/add/operator/map'

import { StorageDb } from '@providers/storageDb'
import { FreightProvider } from '@providers/api/freight'

@IonicPage()
@Component({
  selector: 'find-freight-driver',
  templateUrl: 'find-freight.html'
})
export class FindFreightDriverPage {

  offers: any = []
  user_id: string

  constructor(
    public navCtrl: NavController,
    public apiFreight: FreightProvider,
    public db: StorageDb,
    public navParams: NavParams) {

  }

  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    this.getFreights()
  }

  async getUserId(){
   const id = await this.db.getItem(CONFIG.localdb.USER_KEY).then(res =>{
      return res.userId
    })
    return id
  }

  async getFreights(){
    const userId = await this.getUserId()
    console.log('UserId ' + userId)

    this.apiFreight.getOffert()
    .then(res =>{
      const data = res['data']
      // data.reverse()

      const array = []
      data.forEach(e => {
         const drivers = e['postulantes']
         if(drivers.length > 0){
            for(let i of drivers){
              console.log(i)
              if(i._id !== userId){
                array.push(i)
              }
            }
         }else{
           array.push(e)
         }
      })

      if(array.length > 0){
        array.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
      }

      // console.log(JSON.stringify(data))
      this.offers = array

    }).catch(e =>{
      console.error(e)
    })
  }

  freightDetails(freight){
    this.navCtrl.push('DetailsFreightDriverPage', { id: freight._id})
  }
}
