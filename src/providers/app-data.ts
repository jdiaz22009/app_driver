import { Injectable } from '@angular/core'
import { Platform } from 'ionic-angular'
import { Http } from '@angular/http'
import { AppVersion } from '@ionic-native/app-version'
import { parse } from 'node-html-parser'
import 'rxjs/add/operator/map'

import * as compareVersions from 'compare-versions'

@Injectable()
export class AppData{

  playUlr: string = 'https://play.google.com/store/apps/details?id='
  playUrlend: string = '&hl=en'
  itunesUrl: string = 'http://itunes.apple.com/lookup?bundleId='

  constructor(public http: Http,
              private appVersion: AppVersion,
              public plt: Platform
            ) {

  }

  checkForAppUpdate(){
    return new Promise((resolve, reject) =>{
      this.getAppStoreVersion().then(res =>{
        resolve(res)
      }).catch(e =>{
        reject(e)
      })
      if(this.plt.is('ios')){
        this.getIOSParseVersion()
      }else if(this.plt.is('android')){
        this.getPlayStoreVersion().then(res =>{
          resolve(res)
        }).catch(e =>{
          reject(e)
        })
      }
    })
  }

  getPlayStoreVersion(){
    return new Promise((resolve, reject) =>{
      this.appVersion.getPackageName().then(res =>{
        const url = this.playUlr + res + this.playUrlend
        console.log('url package ' + url)
        this.getAndroidParseVersion(url).then(ver =>{
          let codePlay
          if(ver != undefined && ver != null ){
            codePlay = ver.toString()
          }else{
            reject()
          }
          this.appVersion.getVersionNumber().then(code =>{
            const codeApp = code.toString()
            console.log('app versions play: ' + codePlay + ' app: ' + codeApp)
            const ioCompare = compareVersions(codePlay, codeApp)
            console.log(`ioCompare  ${ioCompare}`)
            if(ioCompare == 1){
              resolve(1) // need update
            }else{
              resolve(0) // updated application
            }
          }).catch(e =>{
            reject(e)
          })
        }).catch(e =>{
          reject(e)
        })
      })
    })
  }

  getAndroidParseVersion(url){
    return new Promise(resolve=>{
      this.http.get(url).subscribe(data =>{
        const root = parse(data['_body'])
        const childgb = root.querySelectorAll(".htlgb")[3].childNodes[0].text
        // console.log('version code from google play ' +  childgb)
        resolve(childgb)
      })
    })
  }

  getIOSParseVersion(){
    return new Promise(resolve=>{
      this.appVersion.getPackageName().then(res =>{
        const url = this.itunesUrl + res
        console.log('url itunes ' + url)
        this.http.get(url).map(res => res.json()).subscribe(data =>{
          const version = data.results[0].version
          // console.log('version code from appStore ' + version)
          resolve(version)
        })
      })
    })
  }

  getAppStoreVersion(){
    return new Promise((resolve ,reject) =>{
      this.getIOSParseVersion().then(ver =>{
        const codePlay = ver.toString()
        this.appVersion.getVersionCode().then(code =>{
            const codeApp = code.toString();
            console.log('app versions play: ' + codePlay + ' app: ' + codeApp)
            const ioCompare = compareVersions(codePlay, codeApp)
            console.log(`ioCompare  ${ioCompare}`)
            if(ioCompare == 1){
              resolve(1) // need update
            }else{
              resolve(0) // updated application
            }
        })
      }).catch(e =>{
        reject(e)
      })
    })
  }

}
