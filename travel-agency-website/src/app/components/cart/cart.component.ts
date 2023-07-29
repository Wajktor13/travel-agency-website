import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { CartItem } from 'src/app/shared/models/cart-item';
import { ExcursionData } from 'src/app/shared/models/excursion-data';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  public cart: CartItem[] = []
  public totalPrice: number = 0
  public totalReservations: number = 0

  constructor(private cartService: CartService, private excursionDataManager: ExcursionsDataManagerService, private router: Router) {
    excursionDataManager.excursionsData$.subscribe(
      {
        next: (data: ExcursionData[]) => {
        this.checkCartItemsAvailability()
        }
        ,
        error: (err: any) => console.log(err)
      }
    )

    cartService.cart$.subscribe(
      {
        next: (cartData: CartItem[]) => {
          this.cart = cartData
          this.totalPrice = 0
          this.totalReservations = 0
          for (let cartItem of this.cart) {
            this.totalReservations += cartItem.amount
            this.totalPrice += this.excursionDataManager.getPriceByID(cartItem.excursionID) * cartItem.amount
          }
        },
        error: (err: any) => console.log(err)
      }
    )
  }

  public getReservations(id: number | undefined): number {
    return this.cartService.getReservationsOf(id as number)
  }

  public getExcursionsWithReservations(): ExcursionData[] {
    let cartFiltered: ExcursionData[] = []
    let excursionData: ExcursionData

    for (let cartItem of this.cart) {
      if (cartItem.amount > 0) {
        excursionData = this.excursionDataManager.getExcursionDetails(cartItem.excursionID) as ExcursionData
        if (excursionData != null) {
          cartFiltered.push(excursionData)
        }
      }
    }

    return cartFiltered
  }

  public navigateToSingleExcursionView(id: number | undefined): void {
    this.router.navigate(['excursion/', id])
  }

  public bookButtonClicked(): void {
    this.cartService.bookCart()
  }

  public removeExcursionButtonClicked(excursionID: number): void {
    this.cartService.removeFromCart(excursionID)
  }

  private checkCartItemsAvailability(): boolean {
    let madeChanges: boolean = false

    for (let cartItem of this.cart) {
      if (cartItem.amount > this.excursionDataManager.getExcursionDetails(cartItem.excursionID)!?.inStock) {
        cartItem.amount = this.excursionDataManager.getExcursionDetails(cartItem.excursionID)!?.inStock 
        madeChanges = true
      }
    }

    if (madeChanges) {
      this.cartService.setCartAndUpdateUser(this.cart)
      alert("Some of the items in your cart are no longer available in the quantity you have selected. The quantity of these items has been changed or they have been removed.")
    }

    return madeChanges
  }
}
