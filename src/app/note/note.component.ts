import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { DevfestHttpService } from '../shared/devfest-http.service';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ActionSheetController } from 'ionic-angular'

import { DevfestDbService } from '../shared/devfest-db.service';

@Component({
  templateUrl: 'note.component.html'
})
export class NoteComponent implements OnInit {
  creatingState: boolean = true;Ò
  session: any = null;
  comment: string = "";
  image: any = "../assets/no-image.png";
  options: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private nav: NavController,
              private navParams: NavParams,
              private devfestHttpService: DevfestHttpService,
              private camera: Camera,
              private dfDbService: DevfestDbService,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing) { 
  }

  ngOnInit() {
    let sessionId = this.navParams.get('sessionId');
    if(sessionId == null) {
        let note = this.navParams.get('note');
        if(!!note) {
            this.creatingState = false;
            this.image = note.image;
            this.comment = note.comment;
            sessionId = note.sessionId;
        }
    }

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

  takeAPhoto() {
      this.options.sourceType = this.camera.PictureSourceType.CAMERA;
      this.camera.getPicture(this.options).then((imageData) => {    
          this.image = 'data:image/jpeg;base64,' + imageData;
          console.log(this.image);
      }, (e) => console.log(e));
  }

  getPictureFromGallery() {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;    
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

  actionSheetOnImage() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Picture',
      buttons: [
        {
          text: 'Share',
          handler: () => {
            // Share via email
            this.socialSharing.share(this.comment, this.session.title, this.image, null).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Note shared.',
                duration: 3000
              });
              toast.present();
            });
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
