import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'verify-drive',
  templateUrl: 'verify.html',
})
export class VerifyDriverPage {

  counter_time: string = '5:00'
  fiveMinutes: number = 60 * 5
  timer: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {


    }
  ionViewDidLoad() {
    this.startTimerDown(this.fiveMinutes)
  }

  ionViewDidLeave(){
    if(this.timer != null)
    clearInterval(this.timer)
  }

  startTimerDown(duration){

    let prevTime = duration

    this.timer = setInterval(()=>{

      let minutes = prevTime / 60
      let seconds = prevTime % 60
      let seconds_s = seconds < 10 ? "0" + seconds : seconds

      this.counter_time =  parseInt(minutes.toString(), 10) + ':' + seconds_s

      prevTime --

    },1000)
  }
}
