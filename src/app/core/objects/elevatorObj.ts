import {EventsService} from './../services/events.service';
import ElevatorTask from './elevatorTask';

export default class ElevatorObj {
  protected _id: number;
  protected _stoppingTime: number;
  protected _floorMoveTime: number;
  protected _currentFloor: number;
  protected _tasks: ElevatorTask[];
  protected events: EventsService = new EventsService();


  constructor(id, stoppingTime, floorMoveTime, currentFloor) {
    this._id = id;
    this._stoppingTime = stoppingTime;
    this._floorMoveTime = floorMoveTime;
    this._currentFloor = currentFloor;
    this._tasks = [];
  }

  getStoppingTime(): number {
    return this._stoppingTime;
  }

  getId(): number {
    return this._id;
  }

  getCurrentFloor(): number {
    return this._currentFloor;
  }

  getEvents() {
    return this.events;
  }

  setTasks(tasks: ElevatorTask[]) {
    this._tasks = tasks;
  }

  addTask(floorNumber: number, id: number) {
    const task = this._createNewTask(floorNumber, id);
    const taskEventService = task.getEvents();
    taskEventService.on('currentFloorUpdated', this.onCurrentFloorUpdated.bind(this));
    taskEventService.on('taskEnded', this.onTaskEnded.bind(this));
    taskEventService.on('taskArrivedToDest', this.onTaskArrivedToDest.bind(this));

    if(this._tasks.length === 0) {
      task.startTask();
    }

    this.events.broadcast('taskAdded',{elevator: this, task: task});
    this._tasks.push(task);

    return task;
  }

  endTask(task: ElevatorTask): void {
    let index = this._tasks.indexOf(task);
    this.events.broadcast('taskEnded',{elevator: this, task: task});
    this._tasks.splice(index,1);
  }

  _createNewTask(floorNumber: number,id:number) {
    let sourceFloor = this._currentFloor;
    let destFloor = floorNumber;
    if(this._tasks.length > 0) {
      sourceFloor = this._tasks[this._tasks.length - 1].getDestFloor();
    }
    let startingTime = this.calculateCompletionTime();

    return new ElevatorTask(id, this._stoppingTime, this._floorMoveTime, sourceFloor, destFloor, startingTime);
  }

  calculateCompletionTime() {
    let completionTime = 0;
    for(var i in this._tasks) {
      completionTime += this._tasks[i].calculateCompletionTime();
    }

    return completionTime;
  }

  onCurrentFloorUpdated(floor) {
    this._currentFloor = floor;
    this.events.broadcast('currentFloorUpdated',{id: this._id, floor: this._currentFloor});
  }

  onTaskArrivedToDest() {
    this.events.broadcast('taskArrivedToDest');
  }

  onTaskEnded(task) {
    this.endTask(task);
    const firstTask = this._tasks.shift();
    if (firstTask) {
      firstTask.startTask();
    };
  }

}
