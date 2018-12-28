import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'

import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { Network } from '@ionic-native/network'
import { IonicStorageModule } from '@ionic/storage'

import { AlertsProvider } from '../providers/alerts'
import { AuthProvider } from '../providers/auth'
import { NetworkProvider } from '../providers/network'
import { StorageDb } from '../providers/storageDb'

import { MyApp } from './app.component'
import { AUTH_MODULE } from '../pages/auth/index'
import { APP_MODULE } from '../pages/app'

@NgModule({
  declarations: [
    MyApp,
    ...AUTH_MODULE,
    ...APP_MODULE
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...AUTH_MODULE,
    ...APP_MODULE
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    AlertsProvider,
    AuthProvider,
    NetworkProvider,
    StorageDb
  ]
})
export class AppModule {}
