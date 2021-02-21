import { first } from 'rxjs/operators';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }
  userName: string = '';

  ngOnInit(): void {
    this.userName = this.authenticationService.currentUserValue.firstName + ' ' + this.authenticationService.currentUserValue.lastName;
  }

  logOut() {
    this.authenticationService.logout();
  }

}
