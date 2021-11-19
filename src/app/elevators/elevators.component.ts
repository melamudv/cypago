import { Component, OnInit } from '@angular/core';
import {ElevatorsService} from '../core/services/elevators.service';
import {environment} from '../../environments/environment';
import {IElevator} from '../models/elevator.model';

@Component({
  selector: 'app-elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.scss'],
  providers: [ElevatorsService]
})

export class ElevatorsComponent implements OnInit {

  elevators: IElevator[];
  elevatorsServiceEvents: any;

  constructor(protected elevatorsService: ElevatorsService) {
    this.elevatorsServiceEvents = elevatorsService.getEvents();
    this.elevatorsServiceEvents.on('elevatorsChanged', this.onElevatorsChanged.bind(this));
    this.elevatorsServiceEvents.on('taskArrivedToDest', this.onTaskArrivedToDest.bind(this));
  }

  ngOnInit(): void {
    this.elevators = this.elevatorsService.getElevatorsJson();
  }

  onElevatorsChanged(elevators): void {
    this.elevators = elevators;
  }

  onTaskArrivedToDest() {
    let audio = new Audio(environment.ASSETS_URL+'ding.mp3');
    audio.play();
  }
}
