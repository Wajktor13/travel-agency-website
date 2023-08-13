import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { FilterExcursionsService } from 'src/app/services/filter-excursions/filter-excursions.service';


@Component({
  selector: 'app-filter-excursions',
  templateUrl: './filter-excursions.component.html',
  styleUrls: ['./filter-excursions.component.css']
})

export class FilterExcursionsComponent implements OnInit, OnDestroy {
  public minPrice: number = 0
  public maxPrice:number = Infinity
  public selectedMinPrice: number = 0
  public selectedMaxPrice: number = Infinity
  public filtersHidden: boolean = false
  private selectedMinPriceSub: Subscription | null = null
  private selectedMaxPriceSub: Subscription | null = null
  private excursionsDataSub: Subscription | null = null

  constructor(
    public excursionDataManager: ExcursionsDataManagerService,
    public filterService: FilterExcursionsService
    ) { }

  public ngOnInit(): void {
    this.resetFilters()
    let radio = document.getElementById('radio-excursions')
    if (radio) {
      radio.setAttribute('checked', 'true')
    }

    this.selectedMaxPriceSub = this.filterService.selectedMaxPrice$.subscribe(
      {
        next: (price: number) => this.selectedMaxPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    this.selectedMinPriceSub = this.filterService.selectedMinPrice$.subscribe(
      {
        next: (price: number) => this.selectedMinPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    this.excursionsDataSub = this.excursionDataManager.excursionsData$.subscribe(
      {
        next: (_: any) => this.updateMinMaxPrice(),
        error: (err: any) => console.log(err)
      }
    )
  }

  public updateMinMaxPrice() {
    let minPrice: number = Infinity
    let maxPrice: number = 0

    for (let excursion of this.excursionDataManager.getExcursionsData()) {
      minPrice = Math.min(minPrice, excursion.unitPrice)
      maxPrice = Math.max(maxPrice, excursion.unitPrice)
    }

    this.minPrice = minPrice
    this.maxPrice = maxPrice

    if (this.selectedMinPrice == 0 || this.selectedMinPrice == Infinity) {
      this.filterService.setSelectedMinPrice(this.minPrice)
    }

    if (this.selectedMaxPrice == Infinity || this.selectedMaxPrice == 0) {
      this.filterService.setSelectedMaxPrice(this.maxPrice)
    }
  }

  public ngOnDestroy(): void {
    this.selectedMinPriceSub?.unsubscribe()
    this.selectedMaxPriceSub?.unsubscribe()
    this.excursionsDataSub?.unsubscribe()
  }

  public changeSelectedMinPrice(event: any): void {
    this.filterService.setSelectedMinPrice(event.target.value)
    this.excursionDataManager.updateMinMaxPrice()
  }

  public changeSelectedMaxPrice(event: any): void {
    this.filterService.setSelectedMaxPrice(event.target.value)
    this.excursionDataManager.updateMinMaxPrice()
  }

  public changeSelectedFromDate(event: any): void {
    this.filterService.setSelectedFromDate(event.target.value)
    this.excursionDataManager.updateMinMaxPrice()
  }

  public changeSelectedToDate(event: any): void {
    this.filterService.setSelectedToDate(event.target.value)
    this.excursionDataManager.updateMinMaxPrice()
  }

  public changeSelectedCountry(event: any): void {
    this.filterService.setSelectedCountry(event.target.value)
    this.excursionDataManager.updateMinMaxPrice()
  }

  public changeSelectedMinStars(event: any): void {
    this.filterService.setSelectedMinStars(event.target.value)
    this.excursionDataManager.updateMinMaxPrice()
  }

  public changeSelectedMaxStars(event: any): void {
    this.filterService.setSelectedMaxStars(event.target.value)
    this.excursionDataManager.updateMinMaxPrice()
  }

  public changeSelectedNoReviews(event: any): void {
    this.filterService.setSelectedNoReviews(event.target.checked)
    this.excursionDataManager.updateMinMaxPrice()
  }

  public resetFilters(): void {
    let noReviewsCheckbox = document.getElementById("no-reviews-input") as HTMLInputElement
    let countryInput = document.getElementById("country-input") as HTMLInputElement
    let minStarsRange = document.getElementById("min-stars-range") as HTMLInputElement
    let maxStarsRange = document.getElementById("max-stars-range") as HTMLInputElement
    let minStarsOutput = document.getElementById("min-stars-output") as HTMLInputElement
    let maxStarsOutput = document.getElementById("max-stars-output") as HTMLInputElement
    let startDateInput = document.getElementById("start-date-input") as HTMLInputElement
    let endDateInput = document.getElementById("end-date-input") as HTMLInputElement
    

    this.filterService.resetFilters(this.minPrice, this.maxPrice)

    noReviewsCheckbox.checked = true
    countryInput.value = "all"
    minStarsRange.value = "1"
    minStarsOutput.value = "1"
    maxStarsRange.value = "5"
    maxStarsOutput.value = "5"
    startDateInput.value = ""
    endDateInput.value = ""

    this.excursionDataManager.updateMinMaxPrice()
  }

  public changeFiltersVisibilty(): void {
    this.filtersHidden = !this.filtersHidden
  }
}
