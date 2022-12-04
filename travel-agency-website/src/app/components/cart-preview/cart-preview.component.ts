import { Component } from '@angular/core';
import { ExcursionCardsStateHolderService } from 'src/app/services/excursion-cards-state-holder/excursion-cards-state-holder.service';



@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})

export class CartPreviewComponent {
  totalReservationsCounter: number = 0

  constructor(private stateHolder: ExcursionCardsStateHolderService){
    stateHolder.reservationsCounterSave.subscribe(
      {
        next: (excursionCardsSave: Map<number, number>) =>{
          this.totalReservationsCounter = 0
          for (let [id, reservationsCounter] of excursionCardsSave){
            this.totalReservationsCounter += reservationsCounter
          }
        }
      }
    )
  }
}
