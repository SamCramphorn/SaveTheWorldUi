import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
// import { Point } from './models/point/point';

@NgModule({
  declarations: [
    AppComponent,
    // Point,
  ], 
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule,
    HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
