import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ReservationHistoryService } from 'src/app/services/reservation-history/reservation-history.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { ReviewData } from 'src/app/shared/models/review-data';
import { UserData } from 'src/app/shared/models/user-data';


@Component({
  selector: 'app-single-excursion-view',
  templateUrl: './single-excursion-view.component.html',
  styleUrls: ['./single-excursion-view.component.css']
})

export class SingleExcursionViewComponent implements OnInit {
  public reservationCounter: number = 0
  public leftToAddToCart: number = 0
  public id: any = -1
  public excursion: ExcursionData = { id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, inStock: 0, shortDescription: '', imgs: [] , reviews: [], longDescription: ''}

  public reviewNick: string = ''
  public reviewDate: string = ''
  public reviewStars: string = '0'
  public reviewText: string = ''

  public date: Date = new Date()

  public currentImgID: number = 0

  constructor(private dataManager: ExcursionsDataManagerService, private route: ActivatedRoute, private cartService: CartService, private router: Router, private reviewsService: ReviewsService, private reservationHistory: ReservationHistoryService, public authService: AuthService) {
    this.dataManager.excursionsData$.subscribe(
      {
        next: (data) => {
          this.excursion = this.dataManager.getExcursionDataByID(this.id)
          this.reservationCounter = this.cartService.getReservationsOf(this.excursion.id)!
          this.leftToAddToCart = this.excursion.inStock - this.reservationCounter
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
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.excursion = this.dataManager.getExcursionDataByID(this.id)
    this.reservationCounter = this.cartService.getReservationsOf(this.excursion.id)!
    this.leftToAddToCart = this.excursion.inStock - this.reservationCounter
  }

  public changeReservationCounter(diff: number): void {
    if (this.authService.isLoggedIn() && this.authService.getCurrentUser().roles.customer) {
      this.cartService.addToCart(this.excursion.id, this.reservationCounter + diff)
      this.leftToAddToCart = this.excursion.inStock - this.reservationCounter

    } else if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login-register'])

    } else {
      alert("Not avaialble for manager / admin")
    }
  }

  public removeButtonClicked(): void {
    this.dataManager.removeFromExcursionsDB(this.excursion)
    this.cartService.removeFromCart(parseInt(this.id))
    this.router.navigate(['excursions'])
  }

  public reviewFormSubmitted(): void {
    let currentUser: UserData = this.authService.getCurrentUser()

    if (currentUser.banned) {
      alert("Your account is banned. You can't add reviews.")
    } else if(this.excursion.reviews.map(r => r.uid).includes(currentUser.uid)){
      alert("You have already reviewed this excursion!")
    } else if(!currentUser.reservations.map(r => r.excursionData.id).includes(this.excursion.id)){
      alert("You have not attended this excursion!")
    }
    else {
      let newReview: ReviewData = {
        reviewID: this.id, uid: currentUser.uid, nick: this.getNickname(), date: this.reviewDate,
        stars: parseInt(this.reviewStars), text: this.reviewText
      }
  
      if (this.reviewsService.validateReview(newReview)) {
        this.reviewsService.addReview(newReview, this.excursion)
        this.reviewNick = ''
        this.reviewDate = ''
        this.reviewStars = '0'
        this.reviewText = ''
      } else {
        alert('Wrong input!')
      }
    }
  }

  public numSequence(n: number): Array<number> {
    return Array(n);
  }

  public getReservationsFromHistory(id: number): number {
    return this.reservationHistory.getNoReservationsByID(this.excursion.id)
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

  public getNickname(): string {
    return this.authService.getTitle()
  }

  public canVote(): boolean {
    return this.authService.getCurrentUser().roles.customer
  }

  public changeSliderImg(event: any, nextImgID: number): void {
    event.stopPropagation()
    
    if (nextImgID < 0) {
      nextImgID = 0
    } else if (nextImgID >= this.excursion.imgs.length) {
      nextImgID = this.excursion.imgs.length - 1
    } else {
      this.currentImgID = nextImgID
    }

    document.getElementById('slider-img')!.setAttribute('src', this.excursion.imgs[this.currentImgID])
  }

  public navigateToFullImg(): void {
    window.open(this.excursion.imgs[this.currentImgID], '_blank')
  }
}
