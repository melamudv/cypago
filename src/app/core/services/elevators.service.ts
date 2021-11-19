import _ from 'lodash';
import {Injectable} from '@angular/core';
import ElevatorObj from '../objects/elevatorObj';
import {EventsService} from './events.service';


@Injectable()
export class ElevatorsService {

   events: EventsService;
   _elevators: ElevatorObj[];
   _elevatorIdCounter: number = 1;
   _taskMaxId: number = 1;
   _elevatorsJson: any[];


  constructor(events: EventsService) {
    this.events = events;
    this._elevators = [];
    this._elevatorsJson = [];
  }

  getEvents() {
    return this.events;
  }

  getElevatorsJson() {
    return this._elevatorsJson;
  }

  addElevator(stoppingTime: number, floorMoveTime: number, currentFloor: number) {
    let elevator = new ElevatorObj(this._elevatorIdCounter++, stoppingTime, floorMoveTime, currentFloor);
    let elevatorEvents = elevator.getEvents();
    elevatorEvents.on('currentFloorUpdated',( data) => {
      this.onElevatorFloorUpdated(data);
      this.events.broadcast('elevatorsChanged', this._elevatorsJson);
    })
    elevatorEvents.on('taskArrivedToDest',(data)=> {
      this.events.broadcast('taskArrivedToDest');
    })
    elevatorEvents.on('taskAdded',(data)=> {
      this.events.broadcast('elevatorsChanged',this._elevatorsJson);
      this.events.broadcast('taskAdded',data);
    })
    elevatorEvents.on('taskEnded',(data)=> {
      this.onTaskEnded(data);
      this.events.broadcast('elevatorsChanged',this._elevatorsJson);
      this.events.broadcast('taskEnded', data);
    })

    this._elevators.push(elevator);
    this._elevatorsJson.push(this._createElevatorDataObj(elevator));

    this.events.broadcast('elevatorsChanged', this._elevatorsJson);

    return elevator;
  }

  addNewTask(floorNumber: number): void {
    this._elevators[0].addTask(floorNumber, this._taskMaxId++);
  }

  _createElevatorDataObj(elevatorObj: ElevatorObj) {
    let elevatorDataObj = {
      id: elevatorObj.getId(),
      floorNumber: elevatorObj.getCurrentFloor()
    };

    return elevatorDataObj;
  }

  onElevatorFloorUpdated(data): void {
    let elevatorDataObj = _.find(this._elevatorsJson, { id: data.id });
    elevatorDataObj.floorNumber = data.floor;
  }
  onTaskEnded(data): void {
    const elevatorDataObj = _.find(this._elevatorsJson, { id: data.elevator.getId()});
    _.remove(elevatorDataObj.tasks, { id: data.task.getId()});
  }

}
