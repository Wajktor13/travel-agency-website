import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReservationData } from 'src/app/shared/models/reservation-data';


@Injectable({
  providedIn: 'root'
})

export class ReservationHistoryService {
  public history$: BehaviorSubject<ReservationData[]> = new BehaviorSubject([] as ReservationData[])

  constructor() { }

  public getHistory(): ReservationData[]{
    return this.history$.getValue()
  }

  public addToHistory(newReservation: ReservationData){
    let current: ReservationData[] = this.history$.getValue()
    current.push(newReservation)
    this.history$.next(current)
  }

  public getReservationsByID(id: number): number{
  let reservationList = this.getHistory().filter(r => r.excursionData.id == id).map(r => r.reservations)

  return reservationList.reduce((a, b) => a + b, 0)
  }
}
