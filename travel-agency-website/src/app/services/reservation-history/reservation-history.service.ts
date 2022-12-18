import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReservationData } from 'src/app/shared/models/reservation-data';


@Injectable({
  providedIn: 'root'
})

export class ReservationHistoryService {
  public history: BehaviorSubject<ReservationData[]> = new BehaviorSubject([] as ReservationData[])

  constructor() { }

  public getHistory(): ReservationData[]{
    return this.history.getValue()
  }

  public addToHistory(newReservation: ReservationData){
    let current: ReservationData[] = this.history.getValue()
    current.push(newReservation)
    this.history.next(current)
  }

  public getHistoryByID(id: number): ReservationData{
    for (let reservation of this.getHistory()){
      if (reservation.id == id){
        return reservation
      }
    }
    return {id: -1,reservationDate: '', status: '', reservations: -1}
  }
}
