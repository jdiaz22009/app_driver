import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { FIREBASE_CONFIG } from './app.firebase.config'
import * as firebase from 'firebase/app'
import 'firebase/auth'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'MainSharedPage'

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {

    this.initializeApp()
  }


  initializeApp() {
    this.platform.ready().then(() => {
      //firebase.initializeApp(FIREBASE_CONFIG)
      this.statusBar.backgroundColorByHexString('#0154a0')
      this.splashScreen.hide()

    })
  }
}




