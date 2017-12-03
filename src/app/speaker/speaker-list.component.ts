import { Component, OnInit } from '@angular/core';

import { DevfestHttpService } from "../shared/devfest-http.service";
import { NavController } from 'ionic-angular';

import { SpeakerDetailComponent } from "./speaker-detail.component";

@Component({
    templateUrl: 'speaker-list.component.html'
})

export class SpeakerListComponent implements OnInit {

    speakers: any;

    constructor(private devfestHttpService: DevfestHttpService,
                private nav: NavController) { }

    ngOnInit() {
        this.devfestHttpService.getSpeakers()
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((json) => {
                this.speakers = Object.keys(json).map((k) => json[k]);                
            })
            .catch((error) => {
                console.log(error);
            });
    }

    goToSpeaker(speakerId) {
        this.nav.push(SpeakerDetailComponent, {speakerId: speakerId});
    }
}