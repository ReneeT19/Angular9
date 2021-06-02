import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // use the + sign to convert a string to a number otherwise there will be error
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(1);
    // if there is change after
    this.route.params
    .subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    )
  }

}
