import { FirebaseProvider } from './firebase'
import { AlertsProvider } from './alerts'
import { CitiesProvider } from './cities'
import { NetworkProvider } from './network'
import { StorageDb } from './storageDb'
import { MediaProvider } from './media'

export const PROVIDERS_MODULE = [
  AlertsProvider,
  CitiesProvider,
  NetworkProvider,
  StorageDb,
  MediaProvider,
  FirebaseProvider,
]
