import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SessionListComponent } from './session-list.component';
import { SessionDetailComponent } from './session-detail.component';
import { SessionBookmarkComponent } from './session-bookmark.component';
import { SessionChatComponent } from './session-chat.component';

import { NoteModule } from '../note/note.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        NoteModule
    ],
    exports: [SessionListComponent, SessionBookmarkComponent],
    declarations: [SessionListComponent, SessionDetailComponent, SessionBookmarkComponent, SessionChatComponent],
    providers: [],
    entryComponents: [
        SessionDetailComponent,
        SessionListComponent,
        SessionChatComponent
    ]
})
export class SessionModule { }
