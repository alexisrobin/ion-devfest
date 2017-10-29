import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { env } from '../env/env'

import { MyApp } from './app.component';
import { HomeModule } from './home/home.module';
import { SessionModule } from './session/session.module';
import { SpeakerModule } from './speaker/speaker.module';
import { ScheduleModule } from './schedule/schedule.module';
import { DevfestHttpService } from './shared/devfest-http.service';
import { DevfestDbService } from './shared/devfest-db.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),    
    IonicModule.forRoot(MyApp),
    HomeModule,
    SessionModule,
    SpeakerModule,
    ScheduleModule,
    AngularFireModule.initializeApp(env.firebase),   
    AngularFireDatabaseModule     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DevfestDbService,
    DevfestHttpService
  ]
})
export class AppModule {}
