import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { ReservationData } from 'src/app/shared/models/reservation-data';


@Component({
  selector: 'app-reservations-history',
  templateUrl: './reservations-history.component.html',
  styleUrls: ['./reservations-history.component.css']
})

export class ReservationsHistoryComponent implements OnInit, OnDestroy {
  public history: ReservationData[] = []
  private reservationHistorySub: Subscription | null = null

  constructor(
    private reservationHistory: ReservationHistoryService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    let radio: HTMLInputElement = document.getElementById('radio-account') as HTMLInputElement
    if (radio) {
      radio.checked = true
    }

    this.reservationHistorySub = this.reservationHistory.reservationsHistory$.subscribe(
      {
        next: (historyData: ReservationData[]) => { 
          this.history = historyData.sort((r1, r2) => {
            return r1.excursionData.startDate > r2.excursionData.startDate ? 1 : -1
          })
         },
        error: (err: any) => console.log(err)
      }
    )
  }

  public ngOnDestroy(): void {
    this.reservationHistorySub?.unsubscribe()
  }

  public navigateToSingleExcursionView(id: number): void {
    this.router.navigate(['excursion/', id])
  }
}
