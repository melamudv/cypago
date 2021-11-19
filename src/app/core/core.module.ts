import { NgModule } from '@angular/core';
import {ElevatorsService} from './services/elevators.service';
import {EventsService} from './services/events.service';


@NgModule({
  imports: [],
  declarations: [],
  exports: [

  ],
  providers: [ElevatorsService, EventsService]
})
export class CoreModule { }
