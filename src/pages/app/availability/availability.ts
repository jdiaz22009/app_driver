import { Component } from '@angular/core'
import { NavController, NavParams, Keyboard } from 'ionic-angular'

import { CitiesProvider } from '../../../providers/cities'


@Component({
  selector: 'page-availability',
  templateUrl: 'availability.html'
})
export class AvailabilityPage {  

  citiesList: any = []
  citiesFilter: any = []
  citySelected: string = ''
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cities: CitiesProvider,
    public keyboard: Keyboard
    ) {
     

  }

  ionViewDidLoad(){
    this.getCities()
  }

  getCities(){    
    this.cities.getAllData().then(res =>{            
      this.cities.getAllCities().then(res =>{
        this.citiesList = res
      })
    })    
  }

  removeFocus() {
    this.keyboard.close()
  }

  getItems() {    

    if (!this.citySelected.trim().length || !this.keyboard.isOpen()) {
      this.citiesFilter = []
      return
    }
    this.citiesFilter = this.citiesList
    this.citiesFilter = this.citiesFilter.filter(item => item.toUpperCase().includes(this.citySelected.toUpperCase()));
    
    // this.citiesFilter = this.citiesList

    // var val = ev._value.toString()

    // if (val && val.trim() != '') {
    //   this.citiesFilter = this.citiesFilter.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1)
    //   })
    // }    
  }

  selectCity(city){
    console.log(city)
    this.citySelected = city
    this.citiesFilter = []
  }

}
