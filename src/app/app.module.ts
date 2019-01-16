import { COMPANY_AUTH_MODULE } from './../pages/company/auth/index';
import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'

import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { Network } from '@ionic-native/network'
import { CallNumber } from '@ionic-native/call-number'
import { SocialSharing } from '@ionic-native/social-sharing'
import { Keyboard } from '@ionic-native/keyboard'
import { IonicStorageModule } from '@ionic/storage'

import { AlertsProvider } from '../providers/alerts'
import { NetworkProvider } from '../providers/network'
import { StorageDb } from '../providers/storageDb'
import { API_MODULE } from '../providers/api/index'
import { CitiesProvider } from '../providers/cities'

import { HttpClientModule, HttpClient } from '@angular/common/http'

import { MyApp } from './app.component'

import { DRIVER_APP_MODULE } from '../pages/driver/app'
import { DRIVER_AUTH_MODULE } from '../pages/driver/auth'
import { DRIVER_COMPONENTS_MODULE } from '../pages/driver/components'
import { COMPANY_APP_MODULE } from '../pages/company/app'
import { COMPANY_COMPONENTS_MODULE } from '../pages/company/components'



@NgModule({
  declarations: [
    MyApp,
    ...DRIVER_APP_MODULE,
    ...DRIVER_AUTH_MODULE,
    ...DRIVER_COMPONENTS_MODULE,
    ...COMPANY_APP_MODULE,
    ...COMPANY_AUTH_MODULE,
    ...COMPANY_COMPONENTS_MODULE
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...DRIVER_APP_MODULE,
    ...DRIVER_AUTH_MODULE,
    ...DRIVER_COMPONENTS_MODULE,
    ...COMPANY_APP_MODULE,
    ...COMPANY_AUTH_MODULE,
    ...COMPANY_COMPONENTS_MODULE
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    Keyboard,
    AlertsProvider,
    NetworkProvider,
    StorageDb,
    CallNumber,
    SocialSharing,
    API_MODULE,
    CitiesProvider
  ]
})
export class AppModule {}
