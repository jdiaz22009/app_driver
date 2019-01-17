import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HomeCompanyPage } from './home'

@NgModule({
  declarations: [
    HomeCompanyPage
  ],
  imports: [
    IonicPageModule.forChild(HomeCompanyPage)    
  ],
})
export class HomeCompanyModule {}