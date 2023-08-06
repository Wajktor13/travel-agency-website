import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart-item';
import { UserData } from 'src/app/shared/models/user-data';
import { AuthService } from '../auth/auth.service';
import { UserDataManagerService } from '../user-data-manager/user-data-manager.service';
import { ExcursionsDataManagerService } from '../excursion-data-manager/excursion-data-manager.service';
import { ReservationHistoryService } from '../reservation-history/reservation-history.service';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { AngularFirestore, CollectionReference } from '@angular/fire/compat/firestore';
import { NotificationsService } from '../notifications/notifications.service';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  public cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject([] as CartItem[])

  constructor(private authService: AuthService, private userDataManager: UserDataManagerService, private excursionDataManager: ExcursionsDataManagerService, private reservationHistory: ReservationHistoryService, 
  private db: AngularFirestore, private notificationService: NotificationsService) { 
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

  public async bookCart(): Promise<void> {
    let d: Date = new Date()
    let currentDate: string = (d.getDate() < 10 ? '0' : '') + d.getDate() + '-' + (d.getMonth() < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + d.getFullYear() + ' | ' + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

    try {
      await this.db.firestore.runTransaction(async (transaction) => {
        for (const cartItem of this.getCart()) {
          if (cartItem.amount > 0) {
            const excursionDetails: ExcursionData =
             this.excursionDataManager.getExcursionDetails(cartItem.excursionID)!;
  
            const updatedInStock = excursionDetails.inStock - cartItem.amount;
            if (updatedInStock >= 0) {
              this.reservationHistory.addToReservationsHistory({
                excursionData: excursionDetails,
                reservationDate: currentDate,
                status: "upcoming",
                amount: cartItem.amount,
              })
  
              transaction.update(this.db.firestore.collection('excursions').doc(excursionDetails.id.toString()), {
                inStock: updatedInStock,
              })

              this.notificationService.updateUpcomingReservations()

            } else {
              throw new Error('not enough stock for excursion: ' + excursionDetails.name);
            }
          }
        }
  
        this.removeAllFromCart();
      });
      
    } catch (error) {
      console.error('transaction failed:', error);
    }
  }

  public checkCartItemsAvailability(): boolean {
    let madeChanges: boolean = false
    let updatedCart: CartItem[] = this.getCart()

    for (let cartItem of updatedCart) {
      if (cartItem.amount > this.excursionDataManager.getExcursionDetails(cartItem.excursionID)!?.inStock) {
        cartItem.amount = this.excursionDataManager.getExcursionDetails(cartItem.excursionID)!?.inStock 
        madeChanges = true
      }
    }

    if (madeChanges) {
      this.setCartAndUpdateUser(updatedCart)
      alert("Some of the items in your cart are no longer available in the quantity you have selected. The quantity of these items has been changed or they have been removed.")
    }

    return madeChanges
  }
}