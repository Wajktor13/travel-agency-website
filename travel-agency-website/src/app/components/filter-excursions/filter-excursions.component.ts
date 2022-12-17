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
  public minPrice: number = 0
  public maxPrice:number = Infinity
  public selectedMinPrice: number = 0
  public selectedMaxPrice: number = Infinity
  private selectedMinStars: number = 1
  private selectedMaxStars: number = 5

  constructor(public dataManager: ExcursionDataManagerService, public filterService: FilterExcursionsService){
    filterService.selectedMaxPrice.subscribe(
      {
        next: (price: number) => this.selectedMaxPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    filterService.selectedMinPrice.subscribe(
      {
        next: (price: number) => this.selectedMinPrice = price,
        error: (err: any) => console.log(err)
      }
    )
    
    dataManager.maxUnitPrice.subscribe(
      {
        next: (price: number) => 
        {
          this.maxPrice = price
          if (this.selectedMaxPrice == 0 || this.selectedMaxPrice == Infinity  || this.selectedMaxPrice > price){
            this.filterService.setSelectedMaxPrice(price)
            this.filterService.setSelectedMaxPrice(Math.min(this.selectedMaxPrice, price))
          }
        },
        error: (err: any) => console.log(err)
      }
    )

    dataManager.minUnitPrice.subscribe(
      {
        next: (price: number) => 
        {
          this.minPrice = price
          if (this.selectedMinPrice == 0 || this.selectedMinPrice == Infinity || this.selectedMinPrice < price){
            this.filterService.setSelectedMinPrice(price)
          }
        },
        error: (err: any) => console.log(err)
      }
    )
  }

  public changeSelectedMinPrice(event: any){
    this.filterService.setSelectedMinPrice(event.target.value)
  }

  public changeSelectedMaxPrice(event: any){
    this.filterService.setSelectedMaxPrice(event.target.value)
  }

  public changeSelectedFromDate(event: any){
    this.filterService.setSelectedFromDate(event.target.value)
  }

  public changeSelectedToDate(event: any){
    this.filterService.setSelectedToDate(event.target.value)
  }

  public changeSelectedCountry(event: any){
    this.filterService.setSelectedCountry(event.target.value)
  }

  public changeSelectedMinStars(event: any){
    this.filterService.setSelectedMinStars(event.target.value)
  }

  public changeSelectedMaxStars(event: any){
    this.filterService.setSelectedMaxStars(event.target.value)
  }

  public changeSelectedNoReviews(event: any){
    this.filterService.setSelectedNoReviews(event.target.checked)
  }

  public resetFilters(): void{
    this.filterService.resetFilters(this.minPrice, this.maxPrice)
  }
}
