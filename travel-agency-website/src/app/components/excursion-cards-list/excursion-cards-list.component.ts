import { Component } from '@angular/core';
import { ExcursionData } from 'src/app/shared/models/excursions-data';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { RemoveExcursionData } from 'src/app/shared/models/remove-excursion-data';
import { CartService } from 'src/app/services/cart/cart.service';
import { FilterExcursionsService } from 'src/app/services/filter-excursions/filter-excursions.service';


@Component({
  selector: 'app-excursion-cards-list',
  templateUrl: './excursion-cards-list.component.html',
  styleUrls: ['./excursion-cards-list.component.css']
})

export class ExcursionCardsListComponent {
  public excursionsData: ExcursionData[] = []
  public selectedMinPrice: number = 0
  public selectedMaxPrice: number = Infinity

  constructor(private dataManager: ExcursionDataManagerService, private cartService: CartService, 
    public filterService: FilterExcursionsService){

    dataManager.excursionsData$.subscribe(
      {
        next: (excursionsData: ExcursionData[]) => this.excursionsData = excursionsData,
        error: (err: any) => console.log(err)
        
      }
    )

    filterService.selectedMinPrice$.subscribe(
      {
        next: (price: number) => this.selectedMinPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    filterService.selectedMaxPrice$.subscribe(
      {
        next: (price: number) => this.selectedMaxPrice = price,
        error: (err: any) => console.log(err)
      }
    )
  }

  public removeExcursionCard(event: any){
    let toRemove: RemoveExcursionData = event
    this.dataManager.removeFromExcursionsDB(toRemove.excursionData)
    this.cartService.removeFromCart(toRemove.excursionData.id)
  }
}
