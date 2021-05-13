import { Component, OnInit } from '@angular/core';

@Component({
  //select by default
  selector: 'app-servers',
  //select by attribute
  // selector: '[app-servers]',
  //select by class just like in css
  // selector: '.app-servers'
  templateUrl: './servers.component.html',
  // template: `
  // <app-server></app-server>
  // <app-server></app-server>
  // `,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  servers = ['Testserver', 'Testserver 2'];
  userName = "";
  serverCreated = false;
  serverName = "two-way binding";
  serverCreationStatus = 'No server was created!';
  serverId: number;
  isOnline: boolean;
  isSubmitted = false;
  allowNewServer = false;
  serverStatus: string = 'offline';
  
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online': 'offline';

    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }
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

  onCreateServer() {
    this.serverCreated = true;
    //to use ngFor
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server was created and the name is " + this.serverName;
  }
}
