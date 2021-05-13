import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  // styleUrls: ['./server.component.css']
  styles: [`
  .online {
    color: yellow;
  }`]
})
export class ServerComponent  {

  name = "";
  serverId: number;
  isOnline: boolean;
  isSubmitted = false;
  userName = "";
  serverCreated = false;
  //to use ngFor instead of calling <app-server> twice in servers.component.html
  servers = ['Testserver', 'Testserver 2'];

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
  
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
  //property binding
  allowNewServer = false;

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online': 'offline';

    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  //event binding
  serverCreationStatus = 'No server was created!';
  // serverName = "";
  serverName = "two-way binding"; //  two-way binding

  onCreateServer() {
    this.serverCreated = true;
    //to use ngFor
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server was created and the name is " + this.serverName;
  }

  onUpdateServerName(event: Event) {
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
