import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { ReviewData } from 'src/app/shared/models/review-data';


@Injectable({
  providedIn: 'root'
})

export class FilterExcursionsService {

  public selectedMinPrice$: BehaviorSubject<number> = new BehaviorSubject(0)
  public selectedMaxPrice$: BehaviorSubject<number> = new BehaviorSubject(Infinity)
  private selectedFromDate: string = ''
  private selectedToDate: string = ''
  private selectedCountry: string = 'all'
  private selectedMinStars: number = 1
  private selectedMaxStars: number = 5
  private noReviews: boolean = true

  constructor() { }

  public filterExcursions(excursionsData: ExcursionData[]): ExcursionData[] {
    return excursionsData.filter((e) => {
      return this.priceFilter(e, this.getSelectedMinPrice(), this.getSelectedMaxPrice()) && this.dateFilter(e, this.selectedFromDate, this.selectedToDate) && this.countryFilter(e, this.selectedCountry) && this.starsFilter(e, this.selectedMinStars, this.selectedMaxStars, this.noReviews) && this.hasNotStartedFilter(e)
    })
  }

  private priceFilter(e: ExcursionData, minPrice: number, maxPrice: number): boolean {
    return e.unitPrice >= minPrice && e.unitPrice <= maxPrice || (minPrice == Infinity && maxPrice == 0)
  }

  private dateFilter(e: ExcursionData, selectedFromDate: string, selectedToDate: string): boolean {
    let selectedFromDateMs: number = Date.parse(selectedFromDate)
    let selectedToDateMs: number = Date.parse(selectedToDate)
    let eFromDateMS: number = Date.parse(e.startDate)
    let eToDateMS: number = Date.parse(e.endDate)

    if (!isNaN(selectedFromDateMs) && !isNaN(selectedToDateMs)) {

      return eFromDateMS >= selectedFromDateMs && eToDateMS <= selectedToDateMs

    } else if (!isNaN(selectedFromDateMs)) {

      return eFromDateMS >= selectedFromDateMs

    } else if (!isNaN(selectedToDateMs)) {

      return eToDateMS <= selectedToDateMs

    } else {

      return true
    }
  }

  private countryFilter(e: ExcursionData, selectedCountry: string): boolean {
    return e.country == selectedCountry || selectedCountry == 'all'
  }

  private starsFilter(e: ExcursionData, minStars: number, maxStars: number, noReviews: boolean): boolean {
    let stars: number = this.getAverageStars(e.reviews)

    return stars >= minStars && stars <= maxStars || (noReviews && stars == 0)
  }

  private hasNotStartedFilter(e: ExcursionData): boolean {
    return new Date(e.startDate) >= new Date()
  }

  public getAverageStars(reviews: ReviewData[]): number {
    if (reviews.length > 0) {
      let total: number = reviews.length - reviews.filter(r => r.stars == 0).map(r => r.stars).reduce((r1, r2) => r1 + r2, 0)

      if (total > 0) {
        return reviews.map(r => r.stars).reduce((r1, r2) => r1 + r2, 0) / total
      }
    }
    
    return 0
  }

  public getSelectedMinPrice(): number {
    return this.selectedMinPrice$.getValue()
  }

  public getSelectedMaxPrice(): number {
    return this.selectedMaxPrice$.getValue()
  }

  public setSelectedMinPrice(newSelectedMinPrice: number) {
    this.selectedMinPrice$.next(newSelectedMinPrice)
  }

  public setSelectedMaxPrice(newSelectedMaxPrice: number) {
    this.selectedMaxPrice$.next(newSelectedMaxPrice)
  }

  public getSelectedFromDate(): string {
    return this.selectedFromDate
  }

  public getSelectedToDate(): string {
    return this.selectedToDate
  }

  public getSelectedCountry(): string {
    return this.selectedCountry
  }

  public getSelectedMinStars(): number {
    return this.selectedMinStars
  }

  public getSelectedMaxStars(): number {
    return this.selectedMaxStars
  }

  public getSelectedNoReviews(): boolean {
    return this.noReviews
  }

  public setSelectedFromDate(newSelectedFromDate: string): void {
    this.selectedFromDate = newSelectedFromDate
  }

  public setSelectedToDate(newSelectedToDate: string): void {
    this.selectedToDate = newSelectedToDate
  }

  public setSelectedCountry(newSelectedCountry: string): void {
    this.selectedCountry = newSelectedCountry
  }

  public setSelectedMinStars(newSelectedMinStars: number): void {
    this.selectedMinStars = newSelectedMinStars
  }

  public setSelectedMaxStars(newSelectedMaxStars: number): void {
    this.selectedMaxStars = newSelectedMaxStars
  }

  public setSelectedNoReviews(newSelectedNoReviews: boolean): void {
    this.noReviews = newSelectedNoReviews
  }

  public resetFilters(minPrice: number, maxPrice: number): void {
    this.setSelectedMinPrice(minPrice)
    this.setSelectedMaxPrice(maxPrice)
    this.setSelectedFromDate('')
    this.setSelectedToDate('')
    this.setSelectedCountry('all')
    this.selectedMinStars = 1
    this.selectedMaxStars = 5
    this.noReviews = true
  }
}
