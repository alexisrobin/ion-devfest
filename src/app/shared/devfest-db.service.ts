import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
 
@Injectable()
export class DevfestDbService {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
 
  constructor(private storage: Storage,
                private sqlite: SQLite,
                private platform: Platform,
                private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
        this.sqlite.create({
            name: 'devfest.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.database = db;
            this.database.executeSql('create table IF NOT EXISTS notes(sessionId INTEGER, comment VARCHAR(300), image BLOB)', {})
                .then(() => {
                    console.log('Executed SQL');
                    this.databaseReady.next(true);                    
                })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    });
  }
 
  addNote(sessionId, comment, image) {
    let data = [sessionId, comment, image]
    return this.database.executeSql("INSERT INTO notes (sessionId, comment, image) VALUES (?, ?, ?)", data).then(data => {
        return data;
    }, err => {
        console.log('Error: ', err);
        return err;
    });
  }
 
  getAllNotes() {
    return this.database.executeSql("SELECT * FROM notes", []).then((data) => {
      let notes = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          notes.push({ 
                sessionId: data.rows.item(i).sessionId,
                comment: data.rows.item(i).comment,
                image: data.rows.item(i).image 
            });
        }
      }
      return notes;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
 
}