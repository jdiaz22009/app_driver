import { ApiClientProvider } from './apiClient'
import { DriverAuthProvider } from './driverAuth'
import { CartProvider } from './cart'
import { FreightProvider } from './freight'
import { CompanyAuthProvider } from './companyAuth'

export const API_MODULE = [
  ApiClientProvider,
  DriverAuthProvider,
  CompanyAuthProvider,
  CartProvider,
  FreightProvider  
]