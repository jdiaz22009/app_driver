import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { ContactSharedComponent } from './contact'


@NgModule({
  declarations: [ 
     ContactSharedComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ContactSharedComponent
  ]
})
export class ContactSharedModule { }