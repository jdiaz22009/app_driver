export interface Cart{  
  license_plate: string;
  type: string; 
  bodywork: string;
  model: number;
  brand: string;
  // **** Aditional information 0
  engine: number;
  chassis: number;
  gas: string;
  configuration: string;
  color: string;
  power : string;
  weight: string;
  capacity: string;
  service_type: string;
  country: string;
  // **** Aditional information 1
  import_declaration: number;
  soat: number;
  soat_expiration: string;
  soat_company_id: string;
  technical_review: number;
  technical_review_expiration: string;
  // propio
  trailer_brand: string;
  trailer_model: string;
  trailer_plate: string;
  gps_company: string;
  gps_company_web: string;
  gps_id: string;
  gps_user: string;
  gps_password: string;
}