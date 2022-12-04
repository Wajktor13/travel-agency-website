import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ExcursionCardsStateHolderService {
  public reservationsCounterSave: BehaviorSubject<Map<number, number>> = new BehaviorSubject(new Map<number, number>)

  constructor() {}

  updateReservationsCounterSave(id:number, newReservationsCounterValue: number){
    let current: Map<number, number> = this.reservationsCounterSave.getValue()
    current.set(id, newReservationsCounterValue)
    this.reservationsCounterSave.next(current)
  }

  contains(id: number): boolean{
    return this.reservationsCounterSave.getValue().has(id)
  }

  delete(id: number): void{
    let current: Map<number, number> = this.reservationsCounterSave.getValue()
    current.delete(id)
    this.reservationsCounterSave.next(current)
  }
}
