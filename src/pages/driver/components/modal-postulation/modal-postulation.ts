import { Component } from '@angular/core'
import { IonicPage, ViewController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'modal-postulation-driver',
  templateUrl: 'modal-postulation.html'
})

export class ModalPostulationDriverComponent {  
  
  constructor(
    public viewCtrl: ViewController
  ){     

  }  

  goBack(mode){
    this.viewCtrl.dismiss({mode: mode})
  }

}
