import { Component, OnInit } from '@angular/core';

import { DevfestService } from "../devfest.service";
import { NavController } from 'ionic-angular';

import { SessionDetailComponent } from "./session-detail.component";

@Component({
    templateUrl: 'session-list.component.html'
})

export class SessionListComponent implements OnInit {

    sessions: any;

    constructor(private devfestService: DevfestService,
                private nav: NavController) { }

    ngOnInit() {
        this.devfestService.getSessions()
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((json) => {
                this.sessions = Object.keys(json).map((k) => json[k]);                
            })
            .catch((error) => {
                console.log(error);
            });
    }

    goToSession(sessionId) {
        this.nav.push(SessionDetailComponent, {sessionId: sessionId});
    }
}