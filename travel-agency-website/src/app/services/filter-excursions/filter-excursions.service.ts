import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private selectedNoReviews: boolean = true

  constructor() { }

  public getSelectedMinPrice(): number{
    return this.selectedMinPrice$.getValue()
  }

  public getSelectedMaxPrice(): number{
    return this.selectedMaxPrice$.getValue()
  }

  public setSelectedMinPrice(newSelectedMinPrice: number){
    this.selectedMinPrice$.next(newSelectedMinPrice)
  }

  public setSelectedMaxPrice(newSelectedMaxPrice: number){
    this.selectedMaxPrice$.next(newSelectedMaxPrice)
  }

  public getSelectedFromDate(): string{
    return this.selectedFromDate
  }

  public getSelectedToDate(): string{
    return this.selectedToDate
  }

  public getSelectedCountry(): string{
    return this.selectedCountry
  }

  public getSelectedMinStars(): number{
    return this.selectedMinStars
  }

  public getSelectedMaxStars(): number{
    return this.selectedMaxStars
  }

  public getSelectedNoReviews(): boolean{
    return this.selectedNoReviews
  }

  public setSelectedFromDate(newSelectedFromDate: string): void{
    this.selectedFromDate = newSelectedFromDate
  }

  public setSelectedToDate(newSelectedToDate: string): void{
    this.selectedToDate = newSelectedToDate
  }

  public setSelectedCountry(newSelectedCountry: string): void{
    this.selectedCountry = newSelectedCountry
  }

  public setSelectedMinStars(newSelectedMinStars: number): void{
    this.selectedMinStars = newSelectedMinStars
  }

  public setSelectedMaxStars(newSelectedMaxStars: number): void{
    this.selectedMaxStars = newSelectedMaxStars
  }

  public setSelectedNoReviews(newSelectedNoReviews: boolean): void{
    this.selectedNoReviews = newSelectedNoReviews
  }

  public resetFilters(minPrice: number, maxPrice: number): void{
    this.setSelectedMinPrice(minPrice)
    this.setSelectedMaxPrice(maxPrice)
    this.setSelectedFromDate('')
    this.setSelectedToDate('')
    this.setSelectedCountry('all')
    this.selectedMinStars = 1
    this.selectedMaxStars = 5
    this.selectedNoReviews = true
  }
}
