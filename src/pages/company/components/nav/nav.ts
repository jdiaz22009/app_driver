import { Component, Input } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

import { AlertsProvider } from '@providers/alerts'
import { CompanyAuthProvider } from '@providers/api/companyAuth'

@Component({
  selector: 'nav-company-component',
  templateUrl: 'nav.html'
})
export class NavCompanyComponent {

  @Input('title') navTitle

  title: string
  modeTitle: boolean = false

  tx_available: string = ''
  driver_available: boolean = true

  constructor(
    public navCtrl: NavController,
    public alert: AlertsProvider,
    public apiCompany: CompanyAuthProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

   
  }

  ngAfterViewInit(){
    this.title = this.navTitle
    this.title === undefined ? this.modeTitle = true : this.modeTitle = false
  }

  chat(){
    this.navCtrl.push('ChatGlobalDriverPage')
  }

  goBack(){
    this.navCtrl.pop()
  }

  logout(){
    const loader = this.loadingCtrl.create({})
    loader.present()
    this.alert.showConfirm('Confirmar cerrar sesión', '', 'Aceptar', 'cancelar').then(res =>{
      loader.dismiss()
      if(res === 1){
        this.apiCompany.logout().then(res =>{
          this.navCtrl.setRoot('MainSharedPage')
        })
      }
    })
  }
}
