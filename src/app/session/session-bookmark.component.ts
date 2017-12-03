import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Storage } from '@ionic/storage';

@Component({
    selector: 'session-bookmark',
    templateUrl: './session-bookmark.component.html'
})

export class SessionBookmarkComponent implements OnInit {

    @Input() id: string;
    private bookmark: boolean = false;

    constructor(private storage: Storage) { }

    ngOnInit() { 
        console.log(this.id);
        this.storage.get(this.id)
            .then((bookmark) => {
                this.bookmark = !!bookmark;
            });
    }

    @HostListener('click', ['$event'])
    switchBookmark() {
        this.bookmark = !this.bookmark;
        console.log(this.bookmark);
        console.log(this.id);
        this.storage.get(this.id)
            .then((bookmark) => {
                this.storage.set(this.id, this.bookmark);
            }).catch((e) => {
                this.storage.set(this.id, this.bookmark);
            });
    }

}