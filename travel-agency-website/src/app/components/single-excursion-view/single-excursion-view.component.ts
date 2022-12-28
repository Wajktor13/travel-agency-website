import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ExcursionData } from 'src/app/shared/models/excursions-data';
import { ReviewData } from 'src/app/shared/models/review-data';


@Component({
  selector: 'app-single-excursion-view',
  templateUrl: './single-excursion-view.component.html',
  styleUrls: ['./single-excursion-view.component.css']
})

export class SingleExcursionViewComponent implements OnInit {
  public reservationCounter: number = 0
  public leftInStock: number = 0
  public id: any = -1
  public excursion: ExcursionData = { id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, maxInStock: 0, description: '', img: '' }

  public reviewNick: string = ''
  public reviewDate: string = ''
  public reviewStars: string = '0'
  public reviewText: string = ''
  public reviews: ReviewData[] = []

  public date: Date = new Date()

  constructor(private dataManager: ExcursionDataManagerService, private route: ActivatedRoute, private cartService: CartService, private router: Router, private reviesService: ReviewsService, private reservationHistory: ReservationHistoryService, private authService: AuthService) {
    this.dataManager.excursionsData$.subscribe(
      {
        next: (data) => {
          this.excursion = this.dataManager.getExcursionDataByID(this.id)
          this.reservationCounter = this.cartService.getReservationsOf(this.excursion.id)!
          this.leftInStock = this.excursion.maxInStock - this.reservationCounter - this.getReservationsFromHistory(this.id)
        },
        error: (err) => console.log(err)
      }
    )

    this.cartService.cart$.subscribe(
      {
        next: (data) => this.reservationCounter = cartService.getReservationsOf(this.excursion.id)!,
        error: (err: any) => console.log(err)
      }
    )

    this.reviesService.reviewsData$.subscribe(
      {
        next: (data) => this.reviews = reviesService.getReviewsByID(this.id),
        error: (err) => console.log(err)
      }
    )
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.reviews = this.reviesService.getReviewsByID(this.id)
    this.excursion = this.dataManager.getExcursionDataByID(this.id)
    this.reservationCounter = this.cartService.getReservationsOf(this.excursion.id)!
    this.leftInStock = this.excursion.maxInStock - this.reservationCounter - this.getReservationsFromHistory(this.id)
  }

  public changeReservationCounter(diff: number): void {
    if (this.authService.isLoggedIn() && this.authService.getCurrentUser().roles.customer) {
      this.cartService.addToCart(this.excursion.id, this.reservationCounter + diff)
      this.leftInStock = this.excursion.maxInStock - this.reservationCounter - this.getReservationsFromHistory(this.id)

    } else if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login-register'])
      
    } else{
      alert("Not avaialble for manager / admin")
    }
  }

  public removeButtonClicked() {
    this.dataManager.removeFromExcursionsDB(this.excursion)
    this.cartService.removeFromCart(parseInt(this.id))
    this.router.navigate(['excursions'])
  }

  public reviewFormSubmitted() {
    let newReview: ReviewData = {
      id: this.id, nick: this.reviewNick, date: this.reviewDate,
      stars: parseInt(this.reviewStars), text: this.reviewText
    }

    if (this.reviesService.validateReview(newReview)) {
      this.reviesService.addReview(newReview)
      this.reviewNick = ''
      this.reviewDate = ''
      this.reviewStars = '0'
      this.reviewText = ''
    } else {
      alert('Wrong input!')
    }
  }

  public numSequence(n: number): Array<number> {
    return Array(n);
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
