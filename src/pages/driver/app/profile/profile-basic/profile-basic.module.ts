import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProfileBasicPage } from './profile-basic'

@NgModule({
    declarations:[
        ProfileBasicPage
    ],
    imports:[
        IonicPageModule.forChild(ProfileBasicPage)
    ],
})

export class ProfileBasicModule {}
