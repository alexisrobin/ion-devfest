import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SessionListComponent } from '../session/session-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  beginingDate = '19/10/17';
  endingDate = '20/10/17';

  constructor(public nav: NavController) { 
  }

  ngOnInit() {
  }

  goToSessionList() {
    this.nav.push(SessionListComponent);    
  }

}
