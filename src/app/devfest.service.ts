import { Injectable } from '@angular/core';

@Injectable()
export class DevfestService {

    private BASE_URL =  "https://raw.githubusercontent.com/DevInstitut/conference-data/master/";

    constructor() { }

    getSessions(): Promise<Response> {
        return window.fetch(this.BASE_URL + "sessions.json", {
            method: "GET",
            headers: {
                "Accept": "application/json"            
            }
        });
    }
}