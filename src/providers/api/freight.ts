import { Injectable } from '@angular/core'

import { ApiClientProvider } from './apiClient'

import { CONFIG } from '../config';

@Injectable()
export class FreightProvider{

  api_url: string = CONFIG.api.url + ':' + CONFIG.api.port

  get_path: string = CONFIG.api.offer.get
  get_new: string = CONFIG.api.offer.new

  constructor(public apiClient: ApiClientProvider){

  }

  getOffert(){

  }

  newOffert(){

  }
}