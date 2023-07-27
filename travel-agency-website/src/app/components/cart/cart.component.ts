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
  private excursionsData: ExcursionData[] = []
  public cart: CartItem[] = []
  public totalPrice: number = 0
  public totalReservations: number = 0

  constructor(private cartService: CartService, private excursionDataManager: ExcursionsDataManagerService, private router: Router, private reservationHistory: ReservationHistoryService) {
    excursionDataManager.excursionsData$.subscribe(
      {
        next: (data: ExcursionData[]) => {
        this.excursionsData = data
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

    for (let cartItem of this.cart) {
      if (cartItem.amount > 0) {
        cartFiltered.push(this.excursionDataManager.getExcursionDetails(cartItem.excursionID) as ExcursionData)
      }
    }

    return cartFiltered
  }

  public navigateToSingleExcursionView(id: number | undefined): void {
    this.router.navigate(['excursion/', id])
  }

  public bookButtonClicked(): void {
    let d: Date = new Date()
    let currentDate: string = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate() + ' | ' + d.getHours() + ':'
    let minutes = d.getMinutes()

    if (minutes < 10) {
      currentDate += '0' + minutes
    } else {
      currentDate += minutes
    }

    for (let cartItem of this.cart) {
      if (cartItem.amount > 0) {
        let excursionDetails: ExcursionData = this.excursionDataManager.getExcursionDetails(cartItem.excursionID)!

        this.reservationHistory.addToReservationsHistory({ excursionData: excursionDetails, reservationDate: currentDate, status: "upcoming", amount: cartItem.amount })

        excursionDetails.inStock -= cartItem.amount

        this.excursionDataManager.updateExcursionData(excursionDetails)
      }
    }

    this.cartService.removeAllFromCart()
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
