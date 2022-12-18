import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
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
  private excursionsData: ExcursionData[] = []
  public history: ReservationData[]= []
  
  constructor(private reservationHistory: ReservationHistoryService, private dataManager: ExcursionDataManagerService, private router: Router){
    dataManager.excursionsData.subscribe(
      {
        next: (data: ExcursionData[]) => this.excursionsData = data,
        error: (err: any) => console.log(err)
      }
    )

    reservationHistory.history.subscribe(
      {
        next: (historyData: ReservationData[]) =>{ this.history = historyData},
        error: (err: any) => console.log(err)
      }
    )
  }

  public getReservations(id: number){
    return this.reservationHistory.getHistoryByID(id).reservations
  }

  public getExcursionDetails(id: number){
    for (let excursion of this.excursionsData){
      if (excursion.id == id){
        return excursion
      }
    }

    return null
  }

  public getExcursionsWithReservations(): ExcursionData[]{
    let historyDetails: ExcursionData[] = []

    for (let reservation of this.history){
      if (reservation.reservations > 0){
        historyDetails.push(this.getExcursionDetails(reservation.id) as ExcursionData)
      }
    }

    return historyDetails
  }

  public navigateToSingleExcursionView(id: number): void{
    this.router.navigate(['excursion/', id])
  }
}
