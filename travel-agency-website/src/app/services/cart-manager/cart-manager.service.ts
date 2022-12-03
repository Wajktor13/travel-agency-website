import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CartManagerService {
  public totalReservationsCounter: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() { }

  updateTotalReservationsCounter(diff: number): void{
    this.totalReservationsCounter.next(this.totalReservationsCounter.getValue() + diff)
  }
}
