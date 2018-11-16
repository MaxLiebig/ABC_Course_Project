import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { TimeEntryService } from '../service/time-entry.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = 'user';

  constructor(private userService: UserService, private timeEntryService: TimeEntryService) { }

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    if(user){
      this.username = user.name;
    }

  }

  reloadData(){
    this.timeEntryService.loadAllTimeEntries();
  }

}
