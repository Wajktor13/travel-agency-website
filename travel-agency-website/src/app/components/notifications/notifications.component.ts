import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { ReservationData } from 'src/app/shared/models/reservation-data';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {
  @Output() emittedNotificationsNumber: EventEmitter<number> = new EventEmitter<number>()
  notificationsNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLoggedIn: boolean = false;
  upcomingReservations: ReservationData[] = [];

  constructor(private authService: AuthService, private reservationHistory: ReservationHistoryService) {
    this.authService.isLoggedIn$.subscribe(
      {
        next: (value) => {
          this.isLoggedIn = value
          if (!this.isLoggedIn) {
            this.upcomingReservations = [];
            this.notificationsNumber.next(0);
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

    this.notificationsNumber.subscribe(
      {
        next: (value) => this.emitNotificationsNumber(value),
        error: (err) => console.log(err)
      }
    )
  }

  public emitNotificationsNumber(notificationsNumber: number): void {
    this.emittedNotificationsNumber.emit(notificationsNumber);
  }

  ngOnInit(): void {
    this.emittedNotificationsNumber.emit(0);
  }

  public getNotificationsNumber(): number {
    return this.notificationsNumber.value;
  }

  public async updateUpcomingReservations(): Promise<void> {
    let reservationHistory: ReservationData[] = await this.reservationHistory.getReservationsHistory();

    this.upcomingReservations = reservationHistory.filter((reservation) => new Date(reservation.excursionData.startDate) > new Date()).sort((a, b) => new Date(a.excursionData.startDate).getTime() - new Date(b.excursionData.startDate).getTime());

    this.notificationsNumber.next(this.upcomingReservations.length);
  }
}
