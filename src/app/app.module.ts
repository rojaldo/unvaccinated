import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapolComponent } from './components/mapol/mapol.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from './components/mapol/NgbdModalComponent';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts-x';


@NgModule({
  declarations: [
    AppComponent, MapolComponent, NgbdModalComponent
  ],
  imports: [
    BrowserModule, NgbModule, FormsModule, ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalComponent]
})
export class AppModule { }
