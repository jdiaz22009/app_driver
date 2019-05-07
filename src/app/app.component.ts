import { Component, ViewChild } from '@angular/core'
import { Platform, NavController } from 'ionic-angular'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { FCM } from "@ionic-native/fcm"
import { LocalNotifications } from '@ionic-native/local-notifications'
import { AndroidPermissions } from '@ionic-native/android-permissions'

import { FIREBASE_CONFIG } from './app.firebase.config'
import * as firebase from 'firebase/app'

import { DriverAuthProvider } from '@providers/api/driverAuth'
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
    public driverAuth: DriverAuthProvider,
    public alerts: AlertsProvider,
    public androidPermissions: AndroidPermissions,
    private localNotifications: LocalNotifications,
    public splashScreen: SplashScreen) {

    this.loadApp()
  }

  async loadApp() {
    this.platform.ready().then(() => {

      if (this.platform.is('cordova')) {

        this.fcm.subscribeToTopic('all').then(res => {
          console.log('subscribeToTopic')
        })

        this.fcm.getToken().then(token => {
          console.log('fire token ' + token)
          this.db.setItem(CONFIG.localdb.USER_FIRETOKEN, token)
        })

        this.fcm.onTokenRefresh().subscribe(token => {
          console.log('fire onTokenRefresh ' + token)
          this.db.setItem(CONFIG.localdb.USER_FIRETOKEN, token)
          //update on cargaYa server
        });

        this.fcm.onNotification().subscribe(data => {
          this.buildNotification(data, data.wasTapped)
        })

        if (!this.localNotifications.hasPermission()) {
          this.localNotifications.requestPermission()
        }

        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          result => console.log('Has permission?', result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        );

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

        // this.localNotifications.on('click').subscribe((data) =>{
        //   this.nav.push('DetailsFreightDriverPage', { id: data.id, mode: 0})
        //   // console.log(data)
        //   // this.nav.push('FindFreightDriverPage')
        // })

        // this.localNotifications.fireQueuedEvents().then(res =>{
        //   console.log('fire queued ' + res)
        // })

        // this.localNotifications.getTriggered().then(res =>{
        //   console.log('fire getTriggered ' + res)
        // })

        // this.localNotifications.on('trigger').subscribe((response) =>     {
        //   console.log('on trigger' + response)
        // })

        // this.localNotifications.getScheduled().then(res =>{
        //   console.log('getScheduled ' + res)
        //   console.log('getScheduled ' + JSON.stringify(res))
        // })

        // this.db.getItem('notifyId').then(res =>{
        //   console.log('notifyId ' + res)
        //   console.log('notifyId ' + JSON.stringify(res))
        // })


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

        // this.db.setItem('notifyId', data.id)

        this.localNotifications.schedule({
          id: data.id,
          title: data.title,
          text: data.body,
          // smallIcon: 'res://ic_stat_notify'
          // smallIcon: 'file://assets/imgs/action_carts'
        })

      }

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
              this.driverAuth.acceptTheOffer(data.id).then(res =>{
                if(res){
                  this.alerts.showAlert('Oferta Aceptada', 'Ya puedes preparte para iniciar el viaje.')
                }
              }).catch(e =>{
                console.error(e)
                this.alerts.showAlert('Error', 'No se ha podido realizar la operación.')
              })
            }
          })
        }

      }
    }

}




