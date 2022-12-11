import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ExcursionData } from 'src/app/shared/models/excursions-data';
import { RemoveExcursionData } from 'src/app/shared/models/remove-excursion-data';


@Component({
  selector: 'app-excursion-card',
  templateUrl: './excursion-card.component.html',
  styleUrls: ['./excursion-card.component.css'],
})

export class ExcursionCardComponent implements OnChanges{
  static minPrice: number = Infinity
  static maxPrice: number = 0
  public reservationCounter: number = 0
  public leftInStock: number = 0

  @Input() excursion: ExcursionData = {id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, maxInStock: 0, description: '', img: ''}
  @Output() removeExcursionCardEvent = new EventEmitter<RemoveExcursionData>()

  constructor(private cartService: CartService, private dataManager: ExcursionDataManagerService, private router: Router){
    dataManager.minUnitPrice.subscribe(
      {
        next: (price: number) => ExcursionCardComponent.minPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    dataManager.maxUnitPrice.subscribe(
      {
        next: (price: number) => ExcursionCardComponent.maxPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    this.cartService.cart.subscribe(
      {
        next: (data) => this.reservationCounter = data.get(this.excursion.id)!,
        error: (err: any) => console.log(err)
      }
    )
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.cartService.isInCart(this.excursion.id)){
      let cart = this.cartService.getCart()
      this.reservationCounter = cart.get(this.excursion.id)!
      this.leftInStock = this.excursion.maxInStock - this.reservationCounter
    } else if (this.excursion.id != -1){
      this.cartService.addToCart(this.excursion.id, 0)
    }

    this.leftInStock = this.excursion.maxInStock - this.reservationCounter
  }

  public changeReservationCounter(diff: number): void{
    this.cartService.addToCart(this.excursion.id, this.reservationCounter + diff)
    this.leftInStock = this.excursion.maxInStock - this.reservationCounter
  }

  public getMinPrice(): number{
    return ExcursionCardComponent.minPrice
  }
  
  public getMaxPrice(): number{
    return ExcursionCardComponent.maxPrice
  }

  public removeButtonClicked(toRemove: ExcursionData){
    this.removeExcursionCardEvent.emit({excursionData : toRemove, reserved: this.reservationCounter})
  }

  public navigateToSingleExcursionView(): void{
    this.router.navigate(['excursion/', this.excursion.id])
  }
}
