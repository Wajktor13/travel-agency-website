import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { ReservationData } from 'src/app/shared/models/reservation-data';


@Component({
  selector: 'app-reservations-history',
  templateUrl: './reservations-history.component.html',
  styleUrls: ['./reservations-history.component.css']
})

export class ReservationsHistoryComponent implements OnInit {
  public history: ReservationData[] = []

  constructor(private reservationHistory: ReservationHistoryService, private router: Router) {
    reservationHistory.reservationsHistory$.subscribe(
      {
        next: (historyData: ReservationData[]) => { this.history = historyData },
        error: (err: any) => console.log(err)
      }
    )
  }

  public ngOnInit(): void {
    let radio: HTMLInputElement = document.getElementById('radio-account') as HTMLInputElement
    if (radio) {
      radio.checked = true
    }
  }

  public navigateToSingleExcursionView(id: number): void {
    this.router.navigate(['excursion/', id])
  }
}
