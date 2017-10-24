import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ActionSheetController } from 'ionic-angular'

import { DevfestDbService } from '../shared/devfest-db.service';

@Component({
  templateUrl: 'note.component.html'
})
export class NoteComponent implements OnInit {
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
              private camera: Camera,
              private dfDbService: DevfestDbService,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing) { 
  }

  ngOnInit() {
    this.session = this.navParams.get('session');
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
