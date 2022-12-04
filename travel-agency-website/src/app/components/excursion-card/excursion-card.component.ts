import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ExcursionCardsStateHolderService } from 'src/app/services/excursion-cards-state-holder/excursion-cards-state-holder.service';
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

  @Input() excursion: ExcursionData = {id: 0, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, maxInStock: 0, description: '', img: ''}
  @Output() removeExcursionCardEvent = new EventEmitter<RemoveExcursionData>()

  constructor(private stateHolder: ExcursionCardsStateHolderService, private dataManager: ExcursionDataManagerService){
    stateHolder.minUnitPrice.subscribe(
      {
        next: (price: number) => ExcursionCardComponent.minPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    stateHolder.maxUnitPrice.subscribe(
      {
        next: (price: number) => ExcursionCardComponent.maxPrice = price,
        error: (err: any) => console.log(err)
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.stateHolder.contains(this.excursion.id)){
      this.stateHolder.add(this.excursion.id, 0, this.excursion.unitPrice)
    }

    this.stateHolder.excursionCardsSave.subscribe(
      {
        next: (data) => this.reservationCounter = data.get(this.excursion.id)?.reservationsCounter!,
        error: (err: any) => console.log(err)
      }
    )

    this.leftInStock = this.excursion.maxInStock - this.reservationCounter
  }

  changeReservationCounter(diff: number): void{
    this.stateHolder.add(this.excursion.id, this.reservationCounter + diff, this.excursion.unitPrice)
    this.leftInStock = this.excursion.maxInStock - this.reservationCounter
  }

  getMinPrice(): number{
    return ExcursionCardComponent.minPrice
  }
  
  getMaxPrice(): number{
    return ExcursionCardComponent.maxPrice
  }

  removeButtonClicked(toRemove: ExcursionData){
    this.removeExcursionCardEvent.emit({excursionData : toRemove, reserved: this.reservationCounter})
    this.stateHolder.remove(toRemove.id)
  }
}
