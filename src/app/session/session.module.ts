import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SessionListComponent } from './session-list.component';
import { SessionDetailComponent } from './session-detail.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [SessionListComponent],
    declarations: [SessionListComponent, SessionDetailComponent],
    providers: [],
    entryComponents: [
        SessionDetailComponent,
        SessionListComponent
    ]
})
export class SessionModule { }
