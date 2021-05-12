import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent  {

  name = "";
  serverId: number;
  isOnline: boolean;
  isSubmitted = false;

  getServerStatus() {
    this.isSubmitted = true;
    //only if you want to generate random numbers use the code below
    // this.serverId = Math.floor(Math.random() *100)
    if(this.serverId > 10) {
      this.isOnline = true;
    } else {
      this.isOnline = false;
    }
  }

  //below is from the tutorial for string interpolation
  serverId2: number = 10;
  serverStatus: string = 'offline';
  //you can call a method as well but you need to make sure you return a string or something can be converted to a string
  getServerStatus2() {
    return this.serverStatus;
  }
}
