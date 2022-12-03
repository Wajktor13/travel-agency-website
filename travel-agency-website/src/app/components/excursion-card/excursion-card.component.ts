import { Component, Input, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CartManagerService } from 'src/app/services/cart-manager/cart-manager.service';
import { MinMaxPriceService } from 'src/app/services/min-max-price/min-max-price.service';
import { ExcursionData } from 'src/app/shared/models/excursions-data';
import { RemoveExcursionData } from 'src/app/shared/models/remove-excursion-data';


@Component({
  selector: 'app-excursion-card',
  templateUrl: './excursion-card.component.html',
  styleUrls: ['./excursion-card.component.css']
})

export class ExcursionCardComponent implements OnInit, OnChanges{
  static minPrice: number = Infinity
  static maxPrice: number = Infinity
  public reservationCounter: number = 0
  public leftInStock: number = 0

  @Input() excursion: ExcursionData = {id: 0, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, maxInStock: 0, description: '', img: ''}
  @Output() removeExcursionCardEvent = new EventEmitter<RemoveExcursionData>()

  constructor(private minMaxPriceService: MinMaxPriceService, private  cdRef:ChangeDetectorRef, 
  private cartManager: CartManagerService){
    minMaxPriceService.minPrice.subscribe(
      {
        next: (price) => ExcursionCardComponent.minPrice = price,
        error: (err: any) => console.log(err)
      }

    )

    minMaxPriceService.maxPrice.subscribe(
      {
        next: (price) => ExcursionCardComponent.maxPrice = price,
        error: (err: any) => console.log(err)
      }
    )
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.minMaxPriceService.addPrice(this.excursion.unitPrice)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.leftInStock = this.excursion.maxInStock - this.reservationCounter
  }

  changeReservationCounter(diff: number): void{
    this.reservationCounter += diff
    this.leftInStock = this.excursion.maxInStock - this.reservationCounter
    this.cartManager.updateTotalReservationsCounter(diff)
  }

  getMinPrice(): number{
    return ExcursionCardComponent.minPrice
  }
  
  getMaxPrice(): number{
    return ExcursionCardComponent.maxPrice
  }

  removeButtonClicked(toRemove: ExcursionData){
    this.removeExcursionCardEvent.emit({excursionData : toRemove, reserved: this.reservationCounter})
  }
}
