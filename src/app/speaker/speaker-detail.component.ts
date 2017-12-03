import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';

import { DevfestHttpService } from '../shared/devfest-http.service';
import { Nav, NavParams, ToastController } from 'ionic-angular';

import { Contacts, Contact, ContactName, ContactOrganization } from '@ionic-native/contacts';

@Component({
  templateUrl: './speaker-detail.component.html'
})
export class SpeakerDetailComponent implements OnInit {

    speaker: any = null;

    constructor(    private devfestHttpService: DevfestHttpService,
                    private nav : Nav,
                    private navParams: NavParams,
                    private contacts: Contacts,
                    private toastCtrl: ToastController){
    }

    ngOnInit() {
        let speakerId = this.navParams.get('speakerId');
        this.devfestHttpService.getSpeakers()
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((json) => {
                this.speaker = json[speakerId];             
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addToContact() {
        if(!!this.speaker) {
            let contact: Contact = this.contacts.create();
            contact.name = new ContactName(this.speaker.name);
            contact.organizations = [new ContactOrganization(this.speaker.company)];
            contact.save().then(
              () => {
                let toast = this.toastCtrl.create({
                    message: 'Added as a contact.',
                    duration: 3000
                });
                toast.present();
              },
              (error: any) => console.error('Error saving contact.', error)
            );
        }
    }

}
