import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { ReservationData } from 'src/app/shared/models/reservation-data';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent {
  notificationsNumber: number = 0;
  isLoggedIn: boolean = false;
  upcomingReservations: ReservationData[] = [];

  constructor (private authService: AuthService, private notificationService: NotificationsService) {
    this.authService.isLoggedIn$.subscribe(
      {
        next: (value) => { this.isLoggedIn = value },
        error: (err) => console.log(err)
      }
    )

    this.notificationService.$notificationsNumber.subscribe(
      {
        next: (value) => { this.notificationsNumber = value },
        error: (err) => console.log(err)
      }
    )

    this.notificationService.$upcomingReservations.subscribe(
      {
        next: (value) => { this.upcomingReservations = value },
        error: (err) => console.log(err)
      }
    )
  }
}
