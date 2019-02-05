import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { FCM } from "@ionic-native/fcm"
import { LocalNotifications } from '@ionic-native/local-notifications'

import { FIREBASE_CONFIG } from './app.firebase.config'
import firebase from 'firebase/app'

import { AlertsProvider } from '@providers/alerts'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'MainSharedPage'

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public fcm: FCM,
    public db: StorageDb,
    public alerts: AlertsProvider,
    private localNotifications: LocalNotifications,
    public splashScreen: SplashScreen) {

    this.initializeApp()
  }


  initializeApp() {
    this.platform.ready().then(() => {

      if (this.platform.is('cordova')) {

        this.fcm.subscribeToTopic('all').then(res =>{
          console.log('subscribeToTopic')
        })

        this.fcm.getToken().then(token => {
          console.log('fire token ' + token)
          this.db.setItem(CONFIG.localdb.USER_FIRETOKEN, token)
        })

        this.fcm.onNotification().subscribe(data => {
          this.buildNotification(data, data.wasTapped)
        })

        if(!this.localNotifications.hasPermission()){
          this.localNotifications.requestPermission()
        }
      }

      firebase.initializeApp(FIREBASE_CONFIG)

      this.statusBar.backgroundColorByHexString('#0154a0')
      this.splashScreen.hide()

    })
  }

  buildNotification(data, mode){
    if(data){
      if(mode){
        console.log("Received in background ", JSON.stringify(data))
        this.localNotifications.schedule({
          id: 1,
          title: data.title,
          text: data.body
        });
      }else{
        console.log("Received in foreground ", JSON.stringify(data))
        this.alerts.showAlert(data.title , data.body)
      }
    }
  }
}




