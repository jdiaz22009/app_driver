import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HomeDriverPage } from './home'
import { NavDriverComponentModule } from '../../components/nav/nav.module';

@NgModule({
  declarations: [
    HomeDriverPage
  ],
  imports: [
    NavDriverComponentModule,
    IonicPageModule.forChild(HomeDriverPage)    
  ],
})
export class HomeDriverModule {}