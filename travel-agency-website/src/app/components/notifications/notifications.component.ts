import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { ReservationData } from 'src/app/shared/models/reservation-data';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {
  public notificationsNumber: number = 0;
  public isLoggedIn: boolean = false;
  public upcomingReservations: ReservationData[] = [];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      {
        next: (value) => { this.isLoggedIn = value },
        error: (err) => console.log(err)
      }
    )

    this.notificationService.notificationsNumber$.subscribe(
      {
        next: (value) => { this.notificationsNumber = value },
        error: (err) => console.log(err)
      }
    )

    this.notificationService.upcomingReservations$.subscribe(
      {
        next: (value) => { this.upcomingReservations = value },
        error: (err) => console.log(err)
      }
    )
  }

  public notificationClicked(): void {
    this.router.navigate(['reservations-history'])
  }
}

