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
import { AndroidPermissions } from '@ionic-native/android-permissions'
import { AppVersion } from '@ionic-native/app-version'
import { FileOpener } from '@ionic-native/file-opener'
import { FileTransfer } from '@ionic-native/file-transfer'
import { File } from '@ionic-native/file'
import { Badge } from '@ionic-native/badge'
import { BackgroundGeolocation } from '@ionic-native/background-geolocation'

import { HttpClientModule } from '@angular/common/http'

import { API_MODULE } from '../providers/api/index'
import { PROVIDERS_MODULE } from '../providers/index'
import { CONFIG } from '../providers/config'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io'
const config: SocketIoConfig = { url: CONFIG.api.url_sockets, options: {} }

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
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
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
    AndroidPermissions,
    Camera,
    AppVersion,
    FileOpener,
    FileTransfer,
    File,
    Badge,
    BackgroundGeolocation,
    API_MODULE,
    PROVIDERS_MODULE,
  ]
})
export class AppModule {}
