import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { ExcursionData } from 'src/app/shared/models/excursions-data';
import { ReservationData } from 'src/app/shared/models/reservation-data';


@Component({
  selector: 'app-reservations-history',
  templateUrl: './reservations-history.component.html',
  styleUrls: ['./reservations-history.component.css']
})

export class ReservationsHistoryComponent {
  public history: ReservationData[]= []
  
  constructor(private reservationHistory: ReservationHistoryService, private router: Router){
    reservationHistory.history.subscribe(
      {
        next: (historyData: ReservationData[]) =>{ this.history = historyData},
        error: (err: any) => console.log(err)
      }
    )
  }

  public getExcursionsWithReservations(): ExcursionData[]{
    let historyDetails: ExcursionData[] = []

    for (let reservation of this.history){
      if (reservation.reservations > 0){
        historyDetails.push(reservation.excursionData)
      }
    }

    return historyDetails
  }

  public navigateToSingleExcursionView(id: number): void{
    this.router.navigate(['excursion/', id])
  }
}
