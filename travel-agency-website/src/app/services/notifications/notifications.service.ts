import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReservationData } from 'src/app/shared/models/reservation-data';
import { AuthService } from '../auth/auth.service';
import { ReservationHistoryService } from '../reservation-history/reservation-history.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
  $notificationsNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  $upcomingReservations: BehaviorSubject<ReservationData[]> = new BehaviorSubject<ReservationData[]>([]);
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private reservationHistory: ReservationHistoryService, private router: Router) {
    this.authService.isLoggedIn$.subscribe(
      {
        next: (value) => {
          this.isLoggedIn = value
          if (!this.isLoggedIn) {
            this.$upcomingReservations.next([]);
            this.$notificationsNumber.next(0);
          }
        },
        error: (err) => console.log(err)
      }
    )

    this.reservationHistory.reservationsHistory$.subscribe(
      {
        next: (value) => this.updateUpcomingReservations(),
        error: (err) => console.log(err)
      }
    )
  }

  ngOnInit(): void {
    setInterval(()=> { this.updateUpcomingReservations }, 10000);
  }

  public getNotificationsNumber(): number {
    return this.$notificationsNumber.value;
  }

  public async updateUpcomingReservations(): Promise<void> {
    let reservationHistory: ReservationData[] = await this.reservationHistory.getReservationsHistory();

    this.$upcomingReservations.next(reservationHistory
    .filter((reservation) => {
      const diffTime = Math.abs(new Date(reservation.excursionData.startDate).getTime() - new Date().getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return new Date(reservation.excursionData.startDate) > new Date() && diffDays <= 30;
    })
    .sort((a, b) => new Date(a.excursionData.startDate).getTime() - new Date(b.excursionData.startDate).getTime()))

    this.$notificationsNumber.next(this.$upcomingReservations.value.length);
  }

  public notificationClicked(): void {
    this.router.navigate(['/reservations-history'])
  }
}
