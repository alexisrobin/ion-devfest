import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SessionListComponent } from '../session/session-list.component';
import { SpeakerListComponent } from '../speaker/speaker-list.component';
import { NoteListComponent } from '../note/note-list.component';
import { ScheduleComponent } from '../schedule/schedule.component';

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

  goToSpeakerList() {
    this.nav.push(SpeakerListComponent);    
  }

  goToNoteList() {
    this.nav.push(NoteListComponent);    
  }

  goToSchedule() {
    this.nav.push(ScheduleComponent);    
  }
}
