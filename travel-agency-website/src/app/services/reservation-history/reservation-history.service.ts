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
  public reservationsHistory$: BehaviorSubject<ReservationData[]> = new BehaviorSubject([] as ReservationData[])

  constructor(private userDataManager: UserDataManagerService, private authService: AuthService) {
    authService.currentUser$.subscribe(
      {
        next: (userData: UserData) => this.reservationsHistory$.next(userData.reservations),
        error: (err) => console.log(err)
      }
    )
   }

  public getReservationsHistory(): ReservationData[] {
    return this.reservationsHistory$.getValue()
  }

  public addToReservationsHistory(newReservation: ReservationData) {
    let currentUser: UserData = this.authService.getCurrentUser()
    currentUser.reservations.push(newReservation)
    this.userDataManager.updateUserData(currentUser)
  }

  public getNoReservationsByID(id: number): number {
  let reservationList = this.getReservationsHistory().filter(r => r.excursionData.id == id).map(r => r.amount)

  return reservationList.reduce((a, b) => a + b, 0)
  }
}
