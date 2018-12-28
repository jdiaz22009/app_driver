import { Injectable } from '@angular/core'
import { Events } from 'ionic-angular'
import { Network } from '@ionic-native/network'

@Injectable()
export class NetworkProvider {  
	
	disconnectSubscription: any
	connectSubscription: any

	constructor(
			public network: Network,
			public eventCtrl: Events
			){
		
	} 

	startNetworkMonitor(){
		this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
			console.log('network was disconnected :-(')
			this.eventCtrl.publish('network:offline')
		})

		this.connectSubscription = this.network.onConnect().subscribe(() => {
			console.log('network connected!')			
			setTimeout(() => {
				if (this.network.type === 'wifi') {
					console.log('wifi network connection')
					this.eventCtrl.publish('network:online')
				}else if(this.network.type === '2g' || 
						this.network.type === '3g' || 
						this.network.type === '4g' || 
						this.network.type === 'cellular'){
						console.log('mobil network connection')				
						this.eventCtrl.publish('network:online')
				}else if(this.network.type === 'none'){
					console.log('none network')
					this.eventCtrl.publish('network:offline')
				}
			}, 3000)
		})
	}

	stopNetWorkMonitor(){
		this.disconnectSubscription.unsubscribe()
		this.connectSubscription.unsubscribe()
	}

	getType(){
		if(this.network.type === 'none'){
			return false
		} 
		return true
	}
	
}