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
import { FCM } from "@ionic-native/fcm"
import { LocalNotifications } from '@ionic-native/local-notifications'
import { Camera } from '@ionic-native/camera'

import { HttpClientModule } from '@angular/common/http'

import { API_MODULE } from '../providers/api/index'
import { PROVIDERS_MODULE } from '../providers/index'

import { MyApp } from './app.component'

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{

    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    Keyboard,
    CallNumber,
    SocialSharing,
    FCM,
    LocalNotifications,
    Camera,
    API_MODULE,
    PROVIDERS_MODULE
  ]
})
export class AppModule {}
