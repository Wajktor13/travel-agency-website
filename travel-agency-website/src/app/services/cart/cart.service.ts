import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  public cart: BehaviorSubject<Map<number, number>> = new BehaviorSubject(new Map<number, number>)

  constructor() {}

  getCart(): Map<number, number>{
    return this.cart.getValue()
  }

  addToCart(id:number, newReservationsCounter: number){
    let current: Map<number, number> = this.cart.getValue()
    current.set(id, newReservationsCounter)
    this.cart.next(current)
  }

  isInCart(id: number): boolean{
    return this.cart.getValue().has(id)
  }

  removeFromCart(id: number): void{
    let current: Map<number, number> = this.cart.getValue()
    current.delete(id)
    this.cart.next(current)
  }
}