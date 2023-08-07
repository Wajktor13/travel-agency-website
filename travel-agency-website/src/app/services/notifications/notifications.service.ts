import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ReservationData } from 'src/app/shared/models/reservation-data';
import { AuthService } from '../auth/auth.service';
import { ReservationHistoryService } from '../reservation-history/reservation-history.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class NotificationsService implements OnInit, OnDestroy {
  public notificationsNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public upcomingReservations$: BehaviorSubject<ReservationData[]> = new BehaviorSubject<ReservationData[]>([]);
  public isLoggedIn: boolean = false;
  private isLoggedInSub: Subscription | null = null;
  private reservationsHistorySub: Subscription | null = null;
  private updateUpcomingReservationsInterval: NodeJS.Timer | null = null;

  constructor(
    private authService: AuthService,
    private reservationHistory: ReservationHistoryService,
    private router: Router
    ) {
    this.isLoggedInSub = this.authService.isLoggedIn$.subscribe(
      {
        next: (value) => {
          this.isLoggedIn = value
          if (!this.isLoggedIn) {
            this.upcomingReservations$.next([]);
            this.notificationsNumber$.next(0);
          }
        },
        error: (err) => console.log(err)
      }
    )

    this.reservationsHistorySub = this.reservationHistory.reservationsHistory$.subscribe(
      {
        next: (_) => this.updateUpcomingReservations(),
        error: (err) => console.log(err)
      }
    )
  }

  public ngOnInit(): void {
    this.updateUpcomingReservationsInterval = setInterval(()=> { this.updateUpcomingReservations }, 10000);
  }

  public ngOnDestroy(): void {
    this.isLoggedInSub?.unsubscribe();
    this.reservationsHistorySub?.unsubscribe();
    clearInterval(this.updateUpcomingReservationsInterval!);
  }

  public getNotificationsNumber(): number {
    return this.notificationsNumber$.value;
  }

  public async updateUpcomingReservations(): Promise<void> {
    let reservationHistory: ReservationData[] = await this.reservationHistory.getReservationsHistory();

    this.upcomingReservations$.next(reservationHistory
    .filter((reservation) => {
      const diffTime = Math.abs(new Date(reservation.excursionData.startDate).getTime() - new Date().getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return new Date(reservation.excursionData.startDate) > new Date() && diffDays <= 30;
    })
    .sort((a, b) => new Date(a.excursionData.startDate).getTime() - new Date(b.excursionData.startDate).getTime()))

    this.notificationsNumber$.next(this.upcomingReservations$.value.length);
  }

  public notificationClicked(): void {
    this.router.navigate(['/reservations-history'])
  }
}
