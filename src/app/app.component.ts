import { Component, ViewChild } from '@angular/core'
import { Platform, NavController, Events, LoadingController, AlertController } from 'ionic-angular'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { FCM } from "@ionic-native/fcm"
import { LocalNotifications } from '@ionic-native/local-notifications'
import { AndroidPermissions } from '@ionic-native/android-permissions'
import { Badge } from '@ionic-native/badge'

import { FIREBASE_CONFIG } from './app.firebase.config'
import * as firebase from 'firebase/app'

import { DriverAuthProvider } from '@providers/api/driverAuth'
import { AlertsProvider } from '@providers/alerts'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'
import { NetworkProvider } from '@providers/network'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'MainSharedPage'

  @ViewChild('myNav') nav: NavController

  alertNetwork: any = null
  loader: any

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public fcm: FCM,
    public db: StorageDb,
    public driverAuth: DriverAuthProvider,
    public alerts: AlertsProvider,
    public androidPermissions: AndroidPermissions,
    private localNotifications: LocalNotifications,
    public splashScreen: SplashScreen,
    private badge: Badge,
    private networkProvider: NetworkProvider,
    public events: Events,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.loadApp()
  }

  ionViewWillLeave(){
   this.networkProvider.stopNetWorkMonitor()
  }

  async loadApp() {
    this.platform.ready().then(() => {

      if (this.platform.is('cordova')) {

        this.requestBadgePermission()

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
        })

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

        this.networkProvider.startNetworkMonitor()
        if(!this.networkProvider.getType()){
          this.showAlertNetWork()
        }
        this.netwokSubscribe()


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
          smallIcon: 'res://ic_stat_notification.png',
          icon: 'res://drawable-hdpi/ic_stat_trans2.png'
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

    async requestBadgePermission(){
      try{
        let hasPermission = await this.badge.hasPermission()
        console.log('badge permission ' + hasPermission)
        if(!hasPermission) await this.badge.requestPermission()
      }catch(e){
        console.error('requestBadgePermission ' + e)
      }
    }

    netwokSubscribe(){
      this.events.subscribe('network:offline', () => {
        this.showAlertNetWork()
      })
      this.events.subscribe('network:online', () => {
        this.dismissAlerNetwork()
      })
    }

    showAlertNetWork(){
      if(this.alertNetwork == null){
        this.alertNetwork = this.alertCtrl.create({
          title: 'Sin Conexión a Internet',
          subTitle: 'No tienes Internet, revisa tu conexión e intenta de nuevo.',
          buttons: [{
            text: 'Conectar',
            handler: () => {
              this.dismissAlerNetwork()
              this.showLoader()
              setTimeout(() => {
                this.dismissLoader()
                if(!this.networkProvider.getType()){
                  this.showAlertNetWork()
                }
              }, 1500)
            }
          }],
          enableBackdropDismiss: false,
        })
        this.alertNetwork.present()
      }
    }

    // showAlertNetWork(){
    //   if(this.alertNetwork == null){
    //     this.alerts.showConfirm('Sin Internet', 'Revisa tu conexión a Internet', 'conectar', 'cancelar').then(res =>{
    //       if(res === 1){
    //         this.dismissAlerNetwork()
    //         this.showLoader()
    //         setTimeout(() => {
    //           this.dismissLoader()
    //           if(!this.networkProvider.getType()){
    //               this.showAlertNetWork()
    //           }
    //         }, 1500)
    //       }
    //     })
    //   }
    // }

    dismissAlerNetwork(){
      this.alertNetwork.dismiss()
      this.alertNetwork = null
    }

    showLoader(){
      this.loader = this.loadingCtrl.create({})
      this.loader.present()
    }

    dismissLoader(){
      this.loader.dismiss()
    }

}




