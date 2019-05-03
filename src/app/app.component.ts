import { Component, ViewChild } from '@angular/core'
import { Platform, NavController } from 'ionic-angular'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { FCM } from "@ionic-native/fcm"
import { LocalNotifications } from '@ionic-native/local-notifications'
import { AndroidPermissions } from '@ionic-native/android-permissions'

import { FIREBASE_CONFIG } from './app.firebase.config'
import * as firebase from 'firebase/app'

import { AlertsProvider } from '@providers/alerts'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'MainSharedPage'

  @ViewChild('myNav') nav: NavController

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public fcm: FCM,
    public db: StorageDb,
    public alerts: AlertsProvider,
    public androidPermissions: AndroidPermissions,
    private localNotifications: LocalNotifications,
    public splashScreen: SplashScreen) {

    this.loadApp()
  }

  loadApp() {
    this.platform.ready().then(() => {

      if (this.platform.is('cordova')) {

        this.fcm.subscribeToTopic('all').then(res => {
          console.log('subscribeToTopic')
        })

        this.fcm.getToken().then(token => {
          console.log('fire token ' + token)
          this.db.setItem(CONFIG.localdb.USER_FIRETOKEN, token)
        })

        this.fcm.onNotification().subscribe(data => {
          this.buildNotification(data, data.wasTapped)
        })


        // this.localNotifications.on('click').subscribe((notification) =>{
        //   console.log('localNotifications click ' + notification)
        //   // this.nav.push('DetailsFreightDriverPage', { id: data.id })
        // })

        // this.localNotifications.on('schedule').subscribe((notification) =>{
        //   console.log('localNotifications schedule ' + notification)
        // })

        // this.localNotifications.on('trigger').subscribe((notification) =>{
        //   console.log('localNotifications trigger ' + notification)
        // })

        // this.localNotifications.on('update').subscribe((notification) =>{
        //   console.log('localNotifications update ' + notification)
        // })

        // this.localNotifications.on('clear').subscribe((notification) =>{
        //   console.log('localNotifications clear ' + notification)
        // })

        if (!this.localNotifications.hasPermission()) {
          this.localNotifications.requestPermission()
        }


        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          result => console.log('Has permission?', result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        );

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

      }

      firebase.initializeApp(FIREBASE_CONFIG)

      this.statusBar.backgroundColorByHexString('#0154a0')
      this.splashScreen.hide()

    })
  }


  buildNotification(data, mode) {
    if (data) {
      if (mode) {
        console.log('Received in background ', JSON.stringify(data))
        this.localNotifications.schedule({
          id: data.id,
          title: data.title,
          text: data.body,
          // icon: 'https://firebasestorage.googleapis.com/v0/b/cargaya-1548175297295.appspot.com/o/notify-ya.png?alt=media&token=7b7ecfa7-be7e-402c-bbf1-f4e0c05c6e31',
          // smallIcon: 'ic_notifications_small'
        })

      } else {
        console.log('Received in foreground ', JSON.stringify(data))
        const type = data.type
        if(type === 'notification_offers'){
          this.alerts.showConfirm(data.title, data.body, 'ver', 'cancelar').then(res => {
            if (res === 1) {
              this.nav.push('DetailsFreightDriverPage', { id: data.id })
            }
          })
        }else if(type === 'notification_asign'){
          this.alerts.showConfirm(data.title, data.body, 'Aceptar', 'cancelar').then(res => {
            if (res === 1) {
              //accept offer
            }
          })
        }

      }
    }
  }
}




