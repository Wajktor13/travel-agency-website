import { Component } from '@angular/core';
import { ExcursionData } from 'src/app/shared/models/excursions-data';
import { ExcursionDataFetcherService } from 'src/app/services/excursion-data-fetcher/excursion-data-fetcher.service';
import { MinMaxPriceService } from 'src/app/services/min-max-price/min-max-price.service';
import { CartManagerService } from 'src/app/services/cart-manager/cart-manager.service';
import { RemoveExcursionData } from 'src/app/shared/models/remove-excursion-data';


@Component({
  selector: 'app-excursion-cards-list',
  templateUrl: './excursion-cards-list.component.html',
  styleUrls: ['./excursion-cards-list.component.css']
})

export class ExcursionCardsListComponent {
  public excursionsData: ExcursionData[] = []

  constructor(private excursionDataFetcher: ExcursionDataFetcherService, private minMaxPriceService: MinMaxPriceService, private cartManager: CartManagerService){

    excursionDataFetcher.excursionsData.subscribe(
      {
        next: (excursionsData: ExcursionData[]) => this.excursionsData = excursionsData,
        error: (err: any) => console.log(err)
      }
    )
  }

  removeExcursionCard(event: any){
    let removeExcursionData: RemoveExcursionData = event
    this.excursionsData = this.excursionsData.filter(excursion => excursion.id != removeExcursionData.excursionData.id)
    this.minMaxPriceService.removePrice(removeExcursionData.excursionData.unitPrice)
    this.cartManager.updateTotalReservationsCounter(-removeExcursionData.reserved)
  }
}
