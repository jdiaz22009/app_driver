import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map'

@Injectable()
export class CitiesProvider{

  data_path:string = 'assets/data/colombia.min.json'
  zones_path:string = 'assets/data/colombia.json'

  geodata: any = []

  constructor(public http: HttpClient){

  }

  async getAllData(){
    this.geodata = await this.http.get(this.data_path).toPromise()
    return this.geodata
  }

  async getDepartments(){
      let data = []
      if(this.geodata != null && this.geodata.length > 0){
        for(let department of this.geodata){
          data.push(department['departamento'])
        }
      }
      return data
  }

  async getCities(index){
    return this.geodata[index].ciudades
  }

  async getAllCities(){
    let data = []
      if(this.geodata != null && this.geodata.length > 0){
        for(let cities of this.geodata){
          for(let city of cities['ciudades']){
            data.push(city)
          }
        }
      }
      return data
  }

  async getAllRegions(){
    return await this.http.get(this.zones_path).toPromise()
  }
}
