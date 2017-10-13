import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { DevfestDbService } from '../shared/devfest-db.service';

@Component({
  templateUrl: 'note.component.html'
})
export class NoteComponent implements OnInit {
  session: any = null;
  comment: string = "";
  image: any = "../assets/default-img.gif";
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private nav: NavController,
              private navParams: NavParams,
              private camera: Camera,
              private dfDbService: DevfestDbService,
              private toastCtrl: ToastController) { 
  }

  ngOnInit() {
    this.session = this.navParams.get('session');
  }

  getPicture() {
      this.camera.getPicture(this.options).then((imageData) => {    
          this.image = 'data:image/jpeg;base64,' + imageData;
          console.log(this.image);
      }, (e) => console.log(e));
  }

  save(comment) {
    this.dfDbService.addNote(this.session.id, this.comment, this.image);
    let toast = this.toastCtrl.create({
      message: 'Note added.',
      duration: 3000
    });
    toast.present();
    this.nav.pop();
  }

}
