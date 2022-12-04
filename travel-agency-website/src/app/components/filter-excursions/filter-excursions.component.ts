import { Component } from '@angular/core';
import { EventType } from '@angular/router';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { FilterExcursionsService } from 'src/app/services/filter-excursions/filter-excursions.service';


@Component({
  selector: 'app-filter-excursions',
  templateUrl: './filter-excursions.component.html',
  styleUrls: ['./filter-excursions.component.css']
})

export class FilterExcursionsComponent {
  public minPrice: number = -1
  public maxPrice:number = -1
  public selectedMinPrice: number = -1
  public selectedMaxPrice: number = 2**20

  constructor(private dataManager: ExcursionDataManagerService, private filterService: FilterExcursionsService){
    dataManager.maxUnitPrice.subscribe(
      {
        next: (price: number) => this.maxPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    dataManager.minUnitPrice.subscribe(
      {
        next: (price: number) => this.minPrice = price,
        error: (err: any) => console.log(err)
      }
    )
  }

  changeSelectedMinPrice(event: any){
    this.selectedMinPrice = event.target.value
    this.filterService.setSelectedMinPrice(this.selectedMinPrice)
  }

  changeSelectedMaxPrice(event: any){
    this.selectedMaxPrice = event.target.value
    this.filterService.setSelectedMaxPrice(this.selectedMaxPrice)
  }
}
