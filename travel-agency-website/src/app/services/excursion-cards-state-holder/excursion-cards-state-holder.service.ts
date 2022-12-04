import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ExcursionCardsStateHolderService {
  public excursionCardsSave: BehaviorSubject<Map<number, {reservationsCounter:number, price: number}>> = new BehaviorSubject(new Map<number, {reservationsCounter:number, price: number}>)
  public minUnitPrice: BehaviorSubject<number> = new BehaviorSubject(Infinity)
  public maxUnitPrice: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {
    this.excursionCardsSave.subscribe(
      {
        next: (excursionCardsSave: Map<number, {reservationsCounter:number, price: number}>) =>{
          this.updateMinMaxPrice(excursionCardsSave)
        },
        error: (err: any) => console.log(err)  
      }
    )
  }

  public add(id:number, newReservationsCounterValue: number, unitPrice: number){
    let currentSave: Map<number, {reservationsCounter:number, price: number}> = this.excursionCardsSave.getValue()
    currentSave.set(id, {reservationsCounter: newReservationsCounterValue, price: unitPrice})
    this.excursionCardsSave.next(currentSave)
  }

  public contains(id: number): boolean{
    return this.excursionCardsSave.getValue().has(id)
  }

  public remove(id: number): void{
    let currentSave: Map<number, {reservationsCounter:number, price: number}> = this.excursionCardsSave.getValue()
    currentSave.delete(id)
    this.excursionCardsSave.next(currentSave)
  }

  private updateMinMaxPrice(excursionCardsSave: Map<number, {reservationsCounter:number, price: number}>){
    let minPrice: number = Infinity
    let maxPrice: number = 0

    for (let [id, data] of excursionCardsSave){
      minPrice = Math.min(minPrice, data.price)
      maxPrice = Math.max(maxPrice, data.price)
    }

    this.minUnitPrice.next(minPrice)
    this.maxUnitPrice.next(maxPrice)
  }
}
