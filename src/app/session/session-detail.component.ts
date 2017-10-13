import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';

import { DevfestService } from '../devfest.service';
import { Nav, NavParams } from 'ionic-angular';

@Component({
  templateUrl: './session-detail.component.html'
})
export class SessionDetailComponent implements OnInit {

    session: any = null;

    constructor(  private devfestService: DevfestService,
                private nav : Nav,
                private navParams: NavParams){
    }

    ngOnInit() {
        let sessionId = this.navParams.get('sessionId');
        this.devfestService.getSessions()
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((json) => {
                this.session = json[sessionId];             
            })
            .catch((error) => {
                console.log(error);
            });
    }

}
