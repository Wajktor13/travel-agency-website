import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ReservationData } from 'src/app/shared/models/reservation-data';
import { UserData } from 'src/app/shared/models/user-data';
import { AuthService } from '../auth/auth.service';
import { UserDataManagerService } from '../user-data-manager/user-data-manager.service';


@Injectable({
  providedIn: 'root'
})

export class ReservationHistoryService implements OnDestroy {
  public reservationsHistory$: BehaviorSubject<ReservationData[]> = new BehaviorSubject([] as ReservationData[])
  public isLoggedIn: boolean = false
  private isLoggedInSub: Subscription | null = null
  private currentUserSub: Subscription | null = null

  constructor(
    private userDataManager: UserDataManagerService,
    private authService: AuthService) { 
      this.currentUserSub = this.authService.currentUser$.subscribe(
        {
          next: (userData: UserData) => {
            this.reservationsHistory$.next(userData.reservations)
            if (this.isLoggedIn) {
              this.updateReservationsStatus()
            } 
          },
          error: (err) => console.log(err)
        }
      )
  
      this.isLoggedInSub = this.authService.isLoggedIn$.subscribe(
        {
          next: (isLoggedIn: boolean) => {
            this.isLoggedIn = isLoggedIn
            if (this.isLoggedIn) {
              this.updateReservationsStatus()
            } 
          },
          error: (err) => console.log(err)
        }
      )
  }

  public ngOnDestroy(): void {
    this.currentUserSub?.unsubscribe()
    this.isLoggedInSub?.unsubscribe()
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

  public updateReservationsStatus() {
    this.reservationsHistory$.value.forEach(element => {
      let reservation = element as ReservationData

      if (new Date(reservation.excursionData.startDate) > new Date()) {
        reservation.status = "upcoming"
      } else if (new Date(reservation.excursionData.startDate) <= new Date() && new Date() <= new Date(reservation.excursionData.endDate)) {
        reservation.status = "ongoing"
      } else {
        reservation.status = "finished"
      }
    })

    if (this.authService.getCurrentUser().uid != "") {
      this.userDataManager.updateUserData(this.authService.getCurrentUser())
    }
  }
}
