import { Component } from '@angular/core';
import { EventType } from '@angular/router';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
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
  public filtersHidden: boolean = false

  constructor(public dataManager: ExcursionsDataManagerService, public filterService: FilterExcursionsService){
    filterService.selectedMaxPrice$.subscribe(
      {
        next: (price: number) => this.selectedMaxPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    filterService.selectedMinPrice$.subscribe(
      {
        next: (price: number) => this.selectedMinPrice = price,
        error: (err: any) => console.log(err)
      }
    )
    
    dataManager.maxUnitPrice$.subscribe(
      {
        next: (price: number) => 
        {
          this.maxPrice = price
          if (this.selectedMaxPrice == 0 || this.selectedMaxPrice == Infinity  || this.selectedMaxPrice < price){
            this.filterService.setSelectedMaxPrice(price)
            this.filterService.setSelectedMaxPrice(Math.min(this.selectedMaxPrice, price))   
            
          }
        },
        error: (err: any) => console.log(err)
      }
    )

    dataManager.minUnitPrice$.subscribe(
      {
        next: (price: number) => 
        {
          this.minPrice = price
          if (this.selectedMinPrice == 0 || this.selectedMinPrice == Infinity || this.selectedMinPrice > price){
            this.filterService.setSelectedMinPrice(price)         
          }
        },
        error: (err: any) => console.log(err)
      }
    )
  }

  public changeSelectedMinPrice(event: any): void {
    this.filterService.setSelectedMinPrice(event.target.value)
  }

  public changeSelectedMaxPrice(event: any): void {
    this.filterService.setSelectedMaxPrice(event.target.value)
  }

  public changeSelectedFromDate(event: any): void {
    this.filterService.setSelectedFromDate(event.target.value)
  }

  public changeSelectedToDate(event: any): void {
    this.filterService.setSelectedToDate(event.target.value)
  }

  public changeSelectedCountry(event: any): void {
    this.filterService.setSelectedCountry(event.target.value)
  }

  public changeSelectedMinStars(event: any): void {
    this.filterService.setSelectedMinStars(event.target.value)
  }

  public changeSelectedMaxStars(event: any): void {
    this.filterService.setSelectedMaxStars(event.target.value)
  }

  public changeSelectedNoReviews(event: any): void {
    this.filterService.setSelectedNoReviews(event.target.checked)
  }

  public resetFilters(): void{
    let noReviewsCheckbox = document.getElementById("no-reviews-input") as HTMLInputElement
    let countryInput = document.getElementById("country-input") as HTMLInputElement
    let minStarsRange = document.getElementById("min-stars-range") as HTMLInputElement
    let maxStarsRange = document.getElementById("max-stars-range") as HTMLInputElement
    let minStarsOutput = document.getElementById("min-stars-output") as HTMLInputElement
    let maxStarsOutput = document.getElementById("max-stars-output") as HTMLInputElement
    

    this.filterService.resetFilters(this.minPrice, this.maxPrice)

    noReviewsCheckbox.checked = true
    countryInput.value = "all"
    minStarsRange.value = "1"
    minStarsOutput.value = "1"
    maxStarsRange.value = "5"
    maxStarsOutput.value = "5"
  }

  public changeFiltersVisibilty(): void{
    this.filtersHidden = !this.filtersHidden
  }
}
