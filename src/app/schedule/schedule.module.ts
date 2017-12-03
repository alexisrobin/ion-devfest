import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';

import { ScheduleComponent } from './schedule.component';
import { SessionModule } from '../session/session.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SessionModule
    ],
    exports: [ScheduleComponent],
    declarations: [ScheduleComponent],
    providers: [Contacts],
    entryComponents: [
        ScheduleComponent
    ]
})
export class ScheduleModule { }
