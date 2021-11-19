import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FloorsComponent } from './floors/floors.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {CoreModule} from './core/core.module';
import {ElevatorsComponent} from './elevators/elevators.component';
import {ElevatorComponent} from './elevator/elevator.component';

@NgModule({
  declarations: [
    AppComponent,
    FloorsComponent,
    ElevatorsComponent,
    ElevatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
