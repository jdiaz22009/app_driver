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
    Keyboard,
    AlertsProvider,    
    NetworkProvider,
    StorageDb,
    CallNumber,
    SocialSharing,
    API_MODULE    
  ]
})
export class AppModule {}
