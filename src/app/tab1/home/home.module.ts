import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { PhotoviewerComponentModule } from '../components/photoviewer/photoviewer.module';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    PhotoviewerComponentModule,
    // 25/10/24 DH: Without this then tabs displayed BUT NO PHOTOVIEWER IMG button screen
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
