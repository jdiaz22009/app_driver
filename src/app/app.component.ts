import { Component, ViewChild } from '@angular/core'
import { Platform, NavController, Events, LoadingController, AlertController } from 'ionic-angular'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { FCM } from "@ionic-native/fcm"
import { LocalNotifications } from '@ionic-native/local-notifications'
import { AndroidPermissions } from '@ionic-native/android-permissions'
import { Badge } from '@ionic-native/badge'
import { Geolocation } from '@ionic-native/geolocation'
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';


import { FIREBASE_CONFIG } from './app.firebase.config'
import * as firebase from 'firebase/app'

import { DriverAuthProvider } from '@providers/api/driverAuth'
import { AlertsProvider } from '@providers/alerts'
import { StorageDb } from '@providers/storageDb'
import { CONFIG } from '@providers/config'
import { NetworkProvider } from '@providers/network'
import { FreightProvider } from '@providers/api/freight'
import { FirebaseProvider } from '@providers/firebase'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'MainSharedPage'

  @ViewChild('myNav') nav: NavController

  alertNetwork: any = null
  loader: any

  showNotification: boolean = true

  geoSubscription: any

  fireHelper: FirebaseProvider = null

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
    public offer: FreightProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    // private fire: FirebaseProvider
    // public backgroundGeolocation: BackgroundGeolocation
    ) {

    this.loadApp()
  }

  ionViewWillLeave(){
   this.networkProvider.stopNetWorkMonitor()
   this.geoSubscription.unsubscribe()
  //  this.backgroundGeolocation.stop()
  }

  async loadApp() {
    this.platform.ready().then(() => {

      firebase.initializeApp(FIREBASE_CONFIG)

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

        setTimeout(() =>{
          this.watchPosition()
        }, 10000)
        // this.getGeolocation()
      }

      // firebase.initializeApp(FIREBASE_CONFIG)

      this.statusBar.backgroundColorByHexString('#0154a0')
      this.splashScreen.hide()

      setTimeout(() =>{
        this.getMyOffers() // valdidate to show assign popup
        // this.getOfferTracking()
      }, 2000)

    })
  }


  //notification: title, body, data: type
  buildNotification(data, mode) {
    console.log('data from firebase messages ' + JSON.stringify(data), ' mode ' + mode)
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

        }else {

          if(this.showNotification){
            this.showNotification = false
            console.log('Received in foreground ', JSON.stringify(data))
            const type = data.type
            if(type === 'notification_offers'){
              this.alerts.showConfirm(data.title, data.body, 'ver', 'cancelar').then(res => {
                this.showNotification = true
                if (res === 1) {
                  this.nav.push('DetailsFreightDriverPage', { id: data.id })
                }
              })
            }else if(type === 'notification_asign'){
              this.alerts.showConfirm(data.title, data.body, 'Aceptar', 'cancelar').then(res => {
                this.showNotification = true
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

    async getUserId() {
      return await this.db.getItem(CONFIG.localdb.USER_KEY).then(res => {
        return res === null ? null : res.userId
      })
    }

    validateArray(data){
      return (data !== undefined && data !== null && Array.isArray(data) && data.length > 0)
    }

    validateOffer(i){
      if (i['estado_flete'] === 'Asignado' && this.showNotification) {
        this.showNotification = false
        const msd = `${i['coordinador'].primer_nombre} de ${i['coordinador']['entidad'].razon} te ha asignado para un viaje de ${i.ciudad_origen} a ${i.ciudad_destino}, ¿Aún deseas tomarlo?`
        this.alerts.showConfirm('Felicitaciones!!!', msd, 'Aceptar', 'Cancelar').then(res => {
          if (res === 1) {
            this.acceptOffer(i._id)
          }
        })
      }
    }

    async getMyOffers() {

      const userId = await this.getUserId()

      if(userId === null) return

      const myOffers = await this.offer.getDriverMyOffers()

      if(myOffers){

        const data = myOffers['data']['data']
        // console.log(JSON.stringify(data))

        if (this.validateArray(data)) {

          let allOffers = []
          let assignedOffers = []
          let historyOffers = []

          let opt = [
            { key: 'postulantes', state: 'Postulado' },
            { key: 'pre_selected', state: 'Pre-seleccionado' },
            { key: 'aprobados', state: 'Aprobado' },
            { key: 'asignados', state: 'Asignado' }
          ]

          for (let i of data) {

            opt.map(y => {
              if(this.validateArray(i[y.key])){
                for (let o of i[y.key]) {
                  if (o._id === userId) {
                    i['estado_flete'] = y.state
                  }
                }
              }
            })

            let addToArray = true

            //state 100 Oferta Cancelada
            //state

            if(this.validateArray(i['driverselected'])){

              if (i['driverselected'][0] !== undefined && i['driverselected'][0]._id === userId) {
                if(i['state'].sequence === 99){
                  if(addToArray){
                    addToArray = false
                    historyOffers.push(i)
                  }
                }else{
                  if(addToArray){
                    addToArray = false
                    assignedOffers.push(i)
                  }
                }
              }

            }else if(this.validateArray(i['asignados'])){

              if (i['asignados'][0] !== undefined && i['asignados'][0]._id === userId) {
                if(i['state'].sequence > 5){
                  if(addToArray){
                    addToArray = false
                    assignedOffers.push(i)
                  }
                }else{
                  if(addToArray){
                    addToArray = false
                    allOffers.push(i)
                  }
                }

                this.validateOffer(i)
              }

            }else if(this.validateArray(i['postulantes'])){

                const isMyUser = i['postulantes'].find(item =>{
                  return item._id === userId
                })

                if(isMyUser !== undefined && isMyUser !== null && typeof(isMyUser) === 'object'){
                  if(addToArray){
                    addToArray = false
                    allOffers.push(i)
                  }
                }
            }

          }

          allOffers.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
          assignedOffers.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
          historyOffers.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())

        }

      }

    }

    acceptOffer(id) {
      console.log('accept offer ' + id)
      this.driverAuth.acceptTheOffer(id).then(res => {
        if (res) {
          this.alerts.showAlert('Oferta Aceptada', 'En viajes en curso encontrarás más información')
          // this.socket.emit('steps', { channel: 'offer_reload' })
          // this.getMyOffers()
        }

      }).catch(e => {
        console.error(e)
        this.alerts.showAlert('Error', 'Ocurrió un error al aceptar la oferta')
      })
    }

    async watchPosition(){

      // let watch = this.geolocation.watchPosition();
      // watch.subscribe((data) => {
      // // data can be a set of coordinates, or an error (if an error occurred).
      // // data.coords.latitude
      // // data.coords.longitude
      // });
      const geoOptions = {
        timeout: 240000,
        maximumAge: 240000,
        // timeout: 5000,
        enableHighAccuracy: true
      }

      this.geoSubscription = this.geolocation.watchPosition(geoOptions)
        .subscribe(async position => {
          console.log(JSON.stringify(position))
          if(position){
            console.log('Driver position '+  position.coords.longitude + ' ' + position.coords.latitude)

            const offer = await this.getOfferTracking()
            // console.log('offert tracking ' + JSON.stringify(offer))
            console.log('offert tracking ' + offer)

            if(offer !== undefined && offer !== null){
              const code = offer['data'].code
              const obj = offer['data'].data
              if(code === 100){

                if(this.validateArray(obj)){
                  const userId = await this.getUserId()

                  const location = {
                    offer: obj[0],
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    userId,
                    timestamp: new Date().getTime()
                  }

                  // console.log('to save into firebase ' + location)

                  await this.saveTracking(userId, location)
                }

              }
            }

          }
      });
    }

    async getOfferTracking(){
      return await this.offer.getOfferTracking()
      // const offert = await this.offer.getOfferTracking()
      // console.log('Offert tracking ' + JSON.stringify(offert))
    }

    async saveTracking(userId, data){

      if(this.fireHelper === null){
        this.fireHelper = new FirebaseProvider()
      }

      // console.log('save to firebase tracking '+ userId + ' ' + JSON.stringify(data))

      await this.fireHelper.saveTracking(userId, data)
      // await this.fire.saveTracking(userId, data)
      // const fire = new FirebaseProvider()
      // await fire.saveTracking(userId, data)
    }

    // async getGeolocation(){
    //   const config: BackgroundGeolocationConfig = {
    //     desiredAccuracy: 10,
    //     stationaryRadius: 20,
    //     distanceFilter: 30,
    //     debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    //     stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    //   }

    //   this.backgroundGeolocation.configure(config)
    //   .then((location: BackgroundGeolocationResponse) => {
    //     console.log('geolocation ' + location)
    //     this.backgroundGeolocation.finish()
    //   }).catch(e =>{
    //     console.error('error to get geolocation ' + e)
    //   })

    //   this.backgroundGeolocation.start()

    // }

}




