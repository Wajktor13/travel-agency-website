import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReservationData } from 'src/app/shared/models/reservation-data';
import { UserData } from 'src/app/shared/models/user-data';
import { AuthService } from '../auth/auth.service';
import { UserDataManagerService } from '../user-data-manager/user-data-manager.service';


@Injectable({
  providedIn: 'root'
})

export class ReservationHistoryService {
  public history$: BehaviorSubject<ReservationData[]> = new BehaviorSubject([] as ReservationData[])

  constructor(private userDataManager: UserDataManagerService, private authService: AuthService) {
    authService.currentUser$.subscribe(
      {
        next: (userData: UserData) => this.history$.next(userData.reservations),
        error: (err) => console.log(err)
      }
    )
   }

  public getHistory(): ReservationData[]{
    return this.history$.getValue()
  }

  public addToHistory(newReservation: ReservationData){
    let currentUser: UserData = this.authService.getCurrentUser()
    currentUser.reservations.push(newReservation)
    this.userDataManager.updateUserData(currentUser)
  }

  public getReservationsByID(id: number): number{
  let reservationList = this.getHistory().filter(r => r.excursionData.id == id).map(r => r.amount)

  return reservationList.reduce((a, b) => a + b, 0)
  }
}
