import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';

import { DevfestHttpService } from '../shared/devfest-http.service';
import { Nav, NavParams } from 'ionic-angular';

import { NoteComponent } from '../note/note.component';

@Component({
  templateUrl: './session-detail.component.html'
})
export class SessionDetailComponent implements OnInit {

    session: any = null;

    constructor(    private devfestHttpService: DevfestHttpService,
                    private nav : Nav,
                    private navParams: NavParams){
    }

    ngOnInit() {
        let sessionId = this.navParams.get('sessionId');
        this.devfestHttpService.getSessions()
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

    goToNote(){
        this.nav.push(NoteComponent, {sessionId: this.session.id});
    }

}
