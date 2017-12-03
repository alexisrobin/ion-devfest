import { Component, OnInit } from '@angular/core';

import { DevfestHttpService } from '../shared/devfest-http.service';
import { NavController } from 'ionic-angular';

import { SessionDetailComponent } from '../session/session-detail.component';

@Component({
    selector: 'schedule',
    templateUrl: 'schedule.component.html'
})

export class ScheduleComponent implements OnInit {

    private schedule: any[];
    private sessions: any[];
    private idxDate: number = 0;

    constructor(private dfHttpService: DevfestHttpService,
                private nav: NavController) { }

    ngOnInit() {
        this.dfHttpService.getSchedule()
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((json) => {
            this.schedule = Object.keys(json).map((k) => json[k]);
        })
        .catch((error) => {
            console.log(error);
        });

        this.dfHttpService.getSessions()
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((json) => {
            this.sessions = json;  
        })
        .catch((error) => {
            console.log(error);
        });
    }

    goToSession(sessionId) {
        this.nav.push(SessionDetailComponent, {sessionId: sessionId});
    }
}