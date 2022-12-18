import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { ReservationData } from 'src/app/shared/models/reservation-data';


@Component({
  selector: 'app-reservations-history',
  templateUrl: './reservations-history.component.html',
  styleUrls: ['./reservations-history.component.css']
})

export class ReservationsHistoryComponent {
  public history: ReservationData[] = []

  constructor(private reservationHistory: ReservationHistoryService, private router: Router) {
    reservationHistory.history.subscribe(
      {
        next: (historyData: ReservationData[]) => { this.history = historyData },
        error: (err: any) => console.log(err)
      }
    )
  }

  public navigateToSingleExcursionView(id: number): void {
    this.router.navigate(['excursion/', id])
  }
}
