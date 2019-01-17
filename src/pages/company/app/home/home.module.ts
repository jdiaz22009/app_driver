import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HomeCompanyPage } from './home'
import { NavCompanyComponentModule } from '@pages/company/components/nav/nav.module'

@NgModule({
  declarations: [
    HomeCompanyPage
  ],
  imports: [
    NavCompanyComponentModule,
    IonicPageModule.forChild(HomeCompanyPage)    
  ],
})
export class HomeCompanyModule {}