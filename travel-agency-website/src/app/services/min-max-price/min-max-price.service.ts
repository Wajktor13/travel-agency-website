import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortedArray } from 'typescript';


@Injectable({
  providedIn: 'root'
})

export class MinMaxPriceService {
  private prices: number[] = []
  public minPrice: BehaviorSubject<number> = new BehaviorSubject(Infinity)
  public maxPrice: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() { }

  addPrice(newPrice: number){
    this.prices.push(newPrice)
    this.updateMinMaxPrice()
  }

  removePrice(newPrice: number){
    let i = this.prices.indexOf(newPrice)
    if (i != -1){
      this.prices.splice(i, 1)
      this.updateMinMaxPrice()
    }
  }

  updateMinMaxPrice(): void{
    this.minPrice.next(Math.min(...this.prices))
    this.maxPrice.next(Math.max(...this.prices))
  }
}
