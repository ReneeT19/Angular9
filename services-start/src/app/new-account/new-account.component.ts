import { Component, EventEmitter, Output } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LoggingService } from '../shared/logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  //inject service
  constructor(private loggingService: LoggingService,
              private accountsService: AccountsService) {}
  onCreateAccount(accountName: string, accountStatus: string) {
    //inject accountsservice to replace the following code and add accountsService addAccount function
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    this.accountsService.addAccount(accountName,accountStatus);
    this.loggingService.logStatusChange(accountStatus);
    // inject service instead of line 17
    // console.log('A server status changed, new status: ' + accountStatus);

  }
}
