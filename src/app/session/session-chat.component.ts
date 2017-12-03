import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'session-chat',
    templateUrl: 'session-chat.component.html'
})

export class SessionChatComponent implements OnInit {
    
    messages: Observable<any[]>;

    message : string;
    name : string;
    session: any;

    constructor(private db: AngularFireDatabase, private navParams: NavParams){
    }

    ngOnInit() { 
        this.session = this.navParams.get('session');
        this.messages = this.db.list(this.session.id).valueChanges();
    }
    
    sendMessage(chatUid : string) {
        if(!!this.message && !!this.name){
            this.db.list(this.session.id).push({
                content: this.message,
                name: this.name
            });
            this.message = "";
        }
    }
}