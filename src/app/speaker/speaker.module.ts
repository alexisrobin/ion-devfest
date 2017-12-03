import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';

import { SpeakerListComponent } from './speaker-list.component';
import { SpeakerDetailComponent } from './speaker-detail.component';

import { NoteModule } from '../note/note.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        NoteModule
    ],
    exports: [SpeakerListComponent, SpeakerDetailComponent],
    declarations: [SpeakerListComponent, SpeakerDetailComponent],
    providers: [Contacts],
    entryComponents: [
        SpeakerDetailComponent,
        SpeakerListComponent
    ]
})
export class SpeakerModule { }
