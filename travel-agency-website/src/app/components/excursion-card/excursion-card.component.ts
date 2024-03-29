import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { RemoveExcursionData } from 'src/app/shared/models/remove-excursion-data';


@Component({
  selector: 'app-excursion-card',
  templateUrl: './excursion-card.component.html',
  styleUrls: ['./excursion-card.component.css'],
})

export class ExcursionCardComponent implements OnChanges, OnInit, OnDestroy {
  static minPrice: number = Infinity
  static maxPrice: number = 0
  public reservationCounter: number = 0
  public leftToAddToCart: number = 0
  private maxPriceSub: Subscription | null = null
  private minPriceSub: Subscription | null = null
  private cartSub: Subscription | null = null


  @Input() excursion: ExcursionData = { id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, inStock: 0, shortDescription: '', imgs: [] , reviews: [], longDescription: ''}
  @Output() removeExcursionCardEvent = new EventEmitter<RemoveExcursionData>()

  constructor(
    private cartService: CartService,
    private excursionDataManager: ExcursionsDataManagerService,
    private router: Router,
    private reviewsService: ReviewsService,
    private reservationHistory: ReservationHistoryService,
    private authService: AuthService
    ) { }

  public ngOnInit(): void {
    this.minPriceSub = this.excursionDataManager.minUnitPrice$.subscribe(
      {
        next: (price: number) => ExcursionCardComponent.minPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    this.maxPriceSub = this.excursionDataManager.maxUnitPrice$.subscribe(
      {
        next: (price: number) => ExcursionCardComponent.maxPrice = price,
        error: (err: any) => console.log(err)
      }
    )

    this.cartSub = this.cartService.cart$.subscribe(
      {
        next: (_) => this.reservationCounter = this.cartService.getReservationsOf(this.excursion.id),
        error: (err: any) => console.log(err)
      }
    )
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.cartService.isInCart(this.excursion.id)) {
      this.reservationCounter = this.cartService.getReservationsOf(this.excursion.id)

    } 

    this.leftToAddToCart = this.excursion.inStock - this.reservationCounter
  }

  public ngOnDestroy(): void {
    this.maxPriceSub?.unsubscribe()
    this.minPriceSub?.unsubscribe()
    this.cartSub?.unsubscribe()
  }

  public changeReservationCounter(diff: number): void {

    if (this.authService.isLoggedIn() && this.authService.getCurrentUser().roles.customer) {
      this.cartService.addToCart(this.excursion.id, this.reservationCounter + diff)
      this.leftToAddToCart = this.excursion.inStock - this.reservationCounter

    } else if (!this.authService.isLoggedIn()) {
      alert("Available for logged in users only.")
      this.router.navigate(['login-register'])
        .then(() => {
          window.location.reload();
        });
      
    } else{
      alert("Not available for manager / admin")
    }
  }

  public getMinPrice(): number {
    return ExcursionCardComponent.minPrice
  }

  public getMaxPrice(): number {
    return ExcursionCardComponent.maxPrice
  }

  public removeButtonClicked(toRemove: ExcursionData): void {
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
    return this.reservationHistory.getNoReservationsByID(this.excursion.id)
  }
}
