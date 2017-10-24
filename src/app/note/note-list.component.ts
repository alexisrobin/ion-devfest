import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { DevfestDbService } from '../shared/devfest-db.service';

import { NoteComponent } from '../note/note.component';

@Component({
  templateUrl: 'note-list.component.html'
})
export class NoteListComponent implements OnInit {
  notes: any[] = null;

  constructor(private nav: NavController,
              private navParams: NavParams,
              private dfDbService: DevfestDbService) { 
  }

  ngOnInit() {
    this.dfDbService.getDatabaseState().subscribe(rdy => {
        console.log("there");
        if (rdy) {
            console.log("ready");
          this.loadNotes();
        }
      })
  }

  loadNotes() {
    this.dfDbService.getAllNotes().then(notes => {
      this.notes = notes;
    })
  }

  goToNote(note) {
      this.nav.push(NoteComponent, {note: note});    
  }

}
