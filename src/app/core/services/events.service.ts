import { Injectable } from '@angular/core';
import { Observable, Subject, from} from 'rxjs';

@Injectable()
export class EventsService {
  listeners: {};
  eventsSubject = new Subject<any>();
  events: any;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Subject();

    this.events = from(this.eventsSubject);

    this.events.subscribe(
      ({name, args}) => {
        if (this.listeners[name]) {
          for (const listener of this.listeners[name]) {
            listener(...args);
          }
        }
      });
  }

  on(name, listener): void {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  broadcast(name, ...args): void {
    this.eventsSubject.next({
      name,
      args
    });
  }
}
