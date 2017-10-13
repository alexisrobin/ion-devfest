import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { SQLite } from '@ionic-native/sqlite';

import { NoteComponent } from './note.component';
import { NoteListComponent } from './note-list.component';

@NgModule({
  imports: [
    IonicModule
  ],
  providers: [Camera, SQLite],
  exports: [NoteComponent, NoteListComponent],
  declarations: [NoteComponent, NoteListComponent],
  entryComponents: [NoteComponent, NoteListComponent]
})
export class NoteModule { }
