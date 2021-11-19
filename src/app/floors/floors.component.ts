import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IFloors} from '../models/floors.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {
  maxFloor: number = 5;
  minFloor: number = 0;
  floors: IFloors[];
  @Output() floorSelected = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    this.floors = this._createFloors(this.minFloor, this.maxFloor);
  }
  selectFloor(floor: IFloors): void {
    if (!floor.active) {
      this.floorSelected.emit(floor.number);
    }
  }
  getFloorHeight(): string {
    return environment.FLOOR_SIZE_IN_PX + 'px';
  }

  _createFloors(min: number, max: number): IFloors[]  {
    const floors = [];
    for (let i = min; i < (max + 1); i++) {
      const floorObj = {
        number: i,
        active: false
      };
      floors.push(floorObj);
    }

    return floors;
  }

}
