import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent {

  @Input() floor: number;
  @Input() id: number;
  elementTop: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.floor) {
      this.elementTop = this.floor * ((environment.FLOOR_SIZE_IN_PX + environment.FLOOR_MARGIN_IN_PX) - this.floor);
    }
  }

}
