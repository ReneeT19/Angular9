import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   
  onAddServer(nameInput: HTMLInputElement) {
    // console.log(nameInput);
    //you can replace this.newServerName below with nameInput
    this.serverCreated.emit({serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value});
  }
}
