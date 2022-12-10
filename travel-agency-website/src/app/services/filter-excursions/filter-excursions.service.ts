import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterExcursionsService {

  public selectedMinPrice: BehaviorSubject<number> = new BehaviorSubject(0)
  public selectedMaxPrice: BehaviorSubject<number> = new BehaviorSubject(Infinity)
  private selectedFromDate: string = ''
  private selectedToDate: string = ''
  private selectedCountry: string = 'all'

  constructor() { }

  public getSelectedMinPrice(): number{
    return this.selectedMinPrice.getValue()
  }

  public getSelectedMaxPrice(): number{
    return this.selectedMaxPrice.getValue()
  }

  public setSelectedMinPrice(newSelectedMinPrice: number){
    this.selectedMinPrice.next(newSelectedMinPrice)
  }

  public setSelectedMaxPrice(newSelectedMaxPrice: number){
    this.selectedMaxPrice.next(newSelectedMaxPrice)
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

  public setSelectedFromDate(newSelectedFromDate: string){
    this.selectedFromDate = newSelectedFromDate
  }

  public setSelectedToDate(newSelectedToDate: string){
    this.selectedToDate = newSelectedToDate
  }

  public setSelectedCountry(newSelectedCountry: string){
    this.selectedCountry = newSelectedCountry
  }

  resetFilters(minPrice: number, maxPrice: number): void{
    this.setSelectedMinPrice(minPrice)
    this.setSelectedMaxPrice(maxPrice)
    this.setSelectedFromDate('')
    this.setSelectedToDate('')
    this.setSelectedCountry('all')
  }
}
