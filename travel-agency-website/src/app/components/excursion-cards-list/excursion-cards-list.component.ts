import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { RemoveExcursionData } from 'src/app/shared/models/remove-excursion-data';
import { CartService } from 'src/app/services/cart/cart.service';
import { FilterExcursionsService } from 'src/app/services/filter-excursions/filter-excursions.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-excursion-cards-list',
  templateUrl: './excursion-cards-list.component.html',
  styleUrls: ['./excursion-cards-list.component.css']
})

export class ExcursionCardsListComponent implements OnInit, OnDestroy {
  public excursionsData: ExcursionData[] = []
  public selectedMinPrice: number = 0
  public selectedMaxPrice: number = Infinity
  private excursionsDataSub: Subscription | null = null
  private selectedMinPriceSub: Subscription | null = null
  private selectedMaxPriceSub: Subscription | null = null

  constructor(
    private dataManager: ExcursionsDataManagerService,
    private cartService: CartService, 
    public filterService: FilterExcursionsService
    ) { }

  public ngOnInit(): void {
    this.cartService.checkCartItemsAvailability()

    let radio: HTMLInputElement = document.getElementById('radio-home') as HTMLInputElement
    if (radio) {
      radio.checked = true
    }

    this.excursionsDataSub = this.dataManager.excursionsData$.subscribe(
      {
        next: (excursionsData: ExcursionData[]) => {
          this.excursionsData = excursionsData
          this.cartService.checkCartItemsAvailability()
        },
        error: (err: any) => console.log(err)
      }
    )

    this.selectedMinPriceSub = this.filterService.selectedMinPrice$.subscribe(
      {
        next: (price: number) => this.selectedMinPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    this.selectedMaxPriceSub = this.filterService.selectedMaxPrice$.subscribe(
      {
        next: (price: number) => this.selectedMaxPrice = price,
        error: (err: any) => console.log(err)
      }
    )
  }

  public ngOnDestroy(): void {
    this.excursionsDataSub?.unsubscribe()
    this.selectedMinPriceSub?.unsubscribe()
    this.selectedMaxPriceSub?.unsubscribe()
  }

  public removeExcursionCard(event: any): void {
    let toRemove: RemoveExcursionData = event
    this.dataManager.removeFromExcursionsDB(toRemove.excursionData)
    this.cartService.removeFromCart(toRemove.excursionData.id)
  }
}
