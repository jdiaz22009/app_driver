import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ChatPrivateDriverPage } from './chat-private'

@NgModule({
  declarations: [
    ChatPrivateDriverPage
  ],
  imports: [
    IonicPageModule.forChild(ChatPrivateDriverPage)    
  ],
})
export class ChatPrivateDriverModule {}