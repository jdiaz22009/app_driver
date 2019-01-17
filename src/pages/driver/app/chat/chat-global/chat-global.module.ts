import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ChatGlobalDriverPage } from './chat-global'


@NgModule({
  declarations: [
    ChatGlobalDriverPage
  ],
  imports: [
    IonicPageModule.forChild(ChatGlobalDriverPage)    
  ],
})
export class ChatGlobalDriverModule {}