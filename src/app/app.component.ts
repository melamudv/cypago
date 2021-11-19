import {Component, OnInit} from '@angular/core';
import {ElevatorsService} from './core/services/elevators.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cypago';
  firstTime: boolean = true;
  constructor(private elevatorsService: ElevatorsService) {
  }

  ngOnInit(): void {
  }

  onFloorSelected(floor: number): void{
    if(this.firstTime){
      this.addElevator();
      this.firstTime = false;
    }
    this.elevatorsService.addNewTask(floor);
  }

  addElevator(): void{
    this.elevatorsService.addElevator(environment.DEFAULT_STOPPING_TIME_AT_FLOOR, environment.DEFAULT_TIME_BETWEEN_FLOORS, environment.DEFAULT_CURRENT_FLOOR);
  }
}

