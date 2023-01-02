import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { RemoveExcursionData } from 'src/app/shared/models/remove-excursion-data';
import { ReviewData } from 'src/app/shared/models/review-data';


@Component({
  selector: 'app-excursion-card',
  templateUrl: './excursion-card.component.html',
  styleUrls: ['./excursion-card.component.css'],
})

export class ExcursionCardComponent implements OnChanges {
  static minPrice: number = Infinity
  static maxPrice: number = 0
  public reservationCounter: number = 0
  public leftToAddToCart: number = 0

  @Input() excursion: ExcursionData = { id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, inStock: 0, description: '', img: '' , reviews: []}
  @Output() removeExcursionCardEvent = new EventEmitter<RemoveExcursionData>()

  constructor(private cartService: CartService, private dataManager: ExcursionDataManagerService, private router: Router, private reviewsService: ReviewsService, private reservationHistory: ReservationHistoryService, private authService: AuthService) {
    dataManager.minUnitPrice$.subscribe(
      {
        next: (price: number) => ExcursionCardComponent.minPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    dataManager.maxUnitPrice$.subscribe(
      {
        next: (price: number) => ExcursionCardComponent.maxPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    this.cartService.cart$.subscribe(
      {
        next: (cartData) => this.reservationCounter = cartService.getReservationsOf(this.excursion.id),
        error: (err: any) => console.log(err)
      }
    )
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.cartService.isInCart(this.excursion.id)) {
      this.reservationCounter = this.cartService.getReservationsOf(this.excursion.id)

    } 
    // else if (this.excursion.id != -1) {
    //   this.cartService.addToCart(this.excursion.id, 0)
    // }

    this.leftToAddToCart = this.excursion.inStock - this.reservationCounter
  }

  public changeReservationCounter(diff: number): void {

    if (this.authService.isLoggedIn() && this.authService.getCurrentUser().roles.customer) {
      this.cartService.addToCart(this.excursion.id, this.reservationCounter + diff)
      this.leftToAddToCart = this.excursion.inStock - this.reservationCounter

    } else if (!this.authService.isLoggedIn()) {
      alert("Available for logged in users only.")
      this.router.navigate(['login-register'])
      
    } else{
      alert("Not avaialble for manager / admin")
    }
  }

  public getMinPrice(): number {
    return ExcursionCardComponent.minPrice
  }

  public getMaxPrice(): number {
    return ExcursionCardComponent.maxPrice
  }

  public removeButtonClicked(toRemove: ExcursionData) {
    this.removeExcursionCardEvent.emit({ excursionData: toRemove, reserved: this.reservationCounter })
  }

  public navigateToSingleExcursionView(): void {
    this.router.navigate(['excursion/', this.excursion.id])
  }

  public numSequence(n: number): Array<number> {
    return Array(n);
  }

  public getAverageStars(): number {
    return this.reviewsService.getAverageStars(this.excursion.reviews)
  }

  public getReservationsFromHistory(id: number): number {
    return this.reservationHistory.getReservationsByID(this.excursion.id)
  }

  public checkRolesForRemovingExcursions(): boolean {
    if (this.authService.isLoggedIn()) {
      let currentUserRoles = this.authService.getCurrentUser().roles
      if (currentUserRoles.admin || currentUserRoles.manager) {
        return true
      }
    }

    return false
  }
}
