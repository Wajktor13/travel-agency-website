import { Component } from '@angular/core';
import { ExcursionCardsStateHolderService } from 'src/app/services/excursion-cards-state-holder/excursion-cards-state-holder.service';



@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})

export class CartPreviewComponent {
  totalReservationsCounter: number = 0

  constructor(private cardsStateHolder: ExcursionCardsStateHolderService){
    cardsStateHolder.reservationsCounterSave.subscribe(
      {
        next: (data: Map<number, number>) => {
          this.totalReservationsCounter = 0
          for (let resrvationCounter of data.values()){
            {
              this.totalReservationsCounter += resrvationCounter
            }
          }
        }
      }
    )
  }
}
