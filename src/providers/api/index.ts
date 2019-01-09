import { ApiClientProvider } from './apiClient'
import { DriverAuthProvider } from './driverAuth'
import { CartProvider } from './cart'
import { FreightProvider } from './freight'

export const API_MODULE = [
  ApiClientProvider,
  DriverAuthProvider,
  CartProvider,
  FreightProvider  
]