import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart-item';
import { UserData } from 'src/app/shared/models/user-data';
import { AuthService } from '../auth/auth.service';
import { UserDataManagerService } from '../user-data-manager/user-data-manager.service';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  public cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject([] as CartItem[])

  constructor(private authService: AuthService, private userDataManager: UserDataManagerService) { 
    authService.currentUser$.subscribe(
      {
        next: (userData: UserData) => this.cart$.next(userData.inCart),
        error: (err) => console.log(err)
      }
    )
  }

  public getCart(): CartItem[] {
    return this.cart$.getValue()
  }

  public setCart(newCart: CartItem[]): void {
    this.cart$.next(newCart)
  }

  public setCartAndUpdateUser(newCart: CartItem[]): void{
    this.setCart(newCart)

    let currentUser = this.authService.getCurrentUser()
    this.userDataManager.updateUserData({uid: currentUser.uid, email: currentUser.email, 
    nickname: currentUser.nickname, roles: currentUser.roles, banned: currentUser.banned,
    inCart: newCart, reservations: currentUser.reservations})
  }

  public addToCart(id: number, newReservationsCounter: number): void {
    let currentCart: CartItem[] = this.getCart().filter(cartItem => cartItem.excursionID != id)
    currentCart.push({excursionID: id, amount: newReservationsCounter} as CartItem)

    this.setCartAndUpdateUser(currentCart)
  }

  public removeFromCart(id: number): void {
    let currentCart: CartItem[] = this.getCart()
    currentCart = currentCart.filter(cartItem => cartItem.excursionID != id)

    this.setCartAndUpdateUser(currentCart)
  }

  public isInCart(id: number): boolean {
    return this.cart$.getValue().map(cartItem => cartItem.excursionID).includes(id)
  }

  public removeAllFromCart(): void {
    this.cart$.next([] as CartItem[])
  }

  public getReservationsOf(id: number): number {
    let cartFiltered = this.getCart().filter(cartItem => cartItem.excursionID == id)
    if (cartFiltered.length > 0) {
      return cartFiltered[0].amount
    }

    return 0
  }
}