import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  public cart: BehaviorSubject<Map<number, number>> = new BehaviorSubject(new Map<number, number>)

  constructor() {}

  add(id:number, newReservationsCounter: number){
    let current: Map<number, number> = this.cart.getValue()
    current.set(id, newReservationsCounter)
    this.cart.next(current)
  }

  contains(id: number): boolean{
    return this.cart.getValue().has(id)
  }

  remove(id: number): void{
    let current: Map<number, number> = this.cart.getValue()
    current.delete(id)
    this.cart.next(current)
  }
}