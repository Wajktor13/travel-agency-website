import { Component } from '@angular/core';
import { ExcursionData } from 'src/app/shared/models/excursions-data';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { RemoveExcursionData } from 'src/app/shared/models/remove-excursion-data';
import { CartService } from 'src/app/services/cart/cart.service';


@Component({
  selector: 'app-excursion-cards-list',
  templateUrl: './excursion-cards-list.component.html',
  styleUrls: ['./excursion-cards-list.component.css']
})

export class ExcursionCardsListComponent {
  public excursionsData: ExcursionData[] = []

  constructor(private excursionDataManager: ExcursionDataManagerService, private cartService: CartService){

    excursionDataManager.excursionsData.subscribe(
      {
        next: (excursionsData: ExcursionData[]) => this.excursionsData = excursionsData,
        error: (err: any) => console.log(err)
        
      }
    )
  }

  removeExcursionCard(event: any){
    let toRemove: RemoveExcursionData = event
    this.excursionDataManager.removeFromExcursionsData(toRemove.excursionData)
    this.cartService.remove(toRemove.excursionData.id)
  }
}
