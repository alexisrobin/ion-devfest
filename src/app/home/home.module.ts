import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    IonicModule
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent],
  entryComponents: [HomeComponent]
})
export class HomeModule { }
