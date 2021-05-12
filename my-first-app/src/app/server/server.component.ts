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
}
