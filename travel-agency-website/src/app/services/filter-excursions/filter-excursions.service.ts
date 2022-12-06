import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterExcursionsService {

  public selectedMinPrice: BehaviorSubject<number> = new BehaviorSubject(0)
  public selectedMaxPrice: BehaviorSubject<number> = new BehaviorSubject(Infinity)

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
}
