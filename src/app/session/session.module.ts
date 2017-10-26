import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SessionListComponent } from './session-list.component';
import { SessionDetailComponent } from './session-detail.component';
import { SessionBookmarkComponent } from './session-bookmark.component';

import { NoteModule } from '../note/note.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        NoteModule
    ],
    exports: [SessionListComponent, SessionBookmarkComponent],
    declarations: [SessionListComponent, SessionDetailComponent, SessionBookmarkComponent],
    providers: [],
    entryComponents: [
        SessionDetailComponent,
        SessionListComponent
    ]
})
export class SessionModule { }
