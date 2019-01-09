export interface NewOffer{
  region: string;
  city_origin: string;
  city_destination: string;
  cart_class: string;
  cart_bodywork: string;
  weight_max: number;
  volume: number;
  init: string;
  end: string;
  freight: number;
  monetary_value: number;
  load: number;
  unload: number;
}