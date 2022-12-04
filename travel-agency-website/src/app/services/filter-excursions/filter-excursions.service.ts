import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterExcursionsService {

  public selectedMinPrice: BehaviorSubject<number> = new BehaviorSubject(-1)
  public selectedMaxPrice: BehaviorSubject<number> = new BehaviorSubject(2**20)

  constructor() { }

  public setSelectedMinPrice(newSelectedMinPrice: number){
    this.selectedMinPrice.next(newSelectedMinPrice)
  }

  public setSelectedMaxPrice(newSelectedMaxPrice: number){
    this.selectedMaxPrice.next(newSelectedMaxPrice)
  }
}
