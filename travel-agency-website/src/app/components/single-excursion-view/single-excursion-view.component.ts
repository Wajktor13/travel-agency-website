import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ExcursionData } from 'src/app/shared/models/excursions-data';
import { ReviewData } from 'src/app/shared/models/review-data';


@Component({
  selector: 'app-single-excursion-view',
  templateUrl: './single-excursion-view.component.html',
  styleUrls: ['./single-excursion-view.component.css']
})

export class SingleExcursionViewComponent implements OnInit{
  public reservationCounter: number = 0
  public leftInStock: number = 0
  public id: any = -1
  public excursion: ExcursionData = {id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, maxInStock: 0, description: '', img: ''}

  public reviewNick: string = ''
  public reviewDate: string = ''
  public reviewStars: string = '0'
  public reviewText: string = ''
  public reviews: ReviewData[] = []

  public date: Date = new Date()

  constructor(private dataManager: ExcursionDataManagerService, private route: ActivatedRoute, private cartService: CartService, private router: Router, private reviesService: ReviewsService){
    this.dataManager.excursionsData.subscribe(
      {
        next: (data) => {
          this.excursion = this.dataManager.getExcursionDataByID(this.id)
          this.reservationCounter = this.cartService.getReservationsOf(this.excursion.id)!
          this.leftInStock = this.excursion.maxInStock - this.reservationCounter
        },
        error: (err) => console.log(err)
      }
    )

    this.cartService.cart.subscribe(
      {
        next: (data) => this.reservationCounter = cartService.getReservationsOf(this.excursion.id)!,
        error: (err: any) => console.log(err)
      }
    )

    this.reviesService.reviewsData.subscribe(
      {
        next: (data) => this.reviews = reviesService.getReviewsByID(this.id),
        error: (err) => console.log(err)
      }
    )
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id')
    this.reviews = this.reviesService.getReviewsByID(this.id)
    this.excursion = this.dataManager.getExcursionDataByID(this.id)
    this.reservationCounter = this.cartService.getReservationsOf(this.excursion.id)!
    this.leftInStock = this.excursion.maxInStock - this.reservationCounter
  }

  public changeReservationCounter(diff: number): void{
    this.cartService.addToCart(this.excursion.id, this.reservationCounter + diff)
    this.leftInStock = this.excursion.maxInStock - this.reservationCounter
  }

  public removeButtonClicked(){
    this.dataManager.removeFromExcursionsDB(this.excursion)
    this.cartService.removeFromCart(parseInt(this.id))
    this.router.navigate(['excursions'])
  }

  public reviewFormSubmitted(){
    this.reviesService.addReview({id:this.id, nick: this.reviewNick, date: this.reviewDate,
    stars: parseInt(this.reviewStars), text: this.reviewText})
  }

  public numSequence(n: number): Array<number> {
    return Array(n);
  }
}
