import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReviewData } from 'src/app/shared/models/review-data';

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {

  public reviewsData: BehaviorSubject<ReviewData[]> = new BehaviorSubject([] as ReviewData[])

  constructor() { }

  getReviewsData(): ReviewData[]{
    return this.reviewsData.getValue()
  }

  getReviewsByID(id: number): ReviewData[]{
    return this.getReviewsData().filter(review => review.id == id)
  }

  addReview(review: ReviewData): void{
    let current: ReviewData[] = this.getReviewsData()
    current.push(review)
    this.reviewsData.next(current)
  }

  getAverageStarsByID(id: number): number{
    let reviewsForID: ReviewData[] = this.getReviewsData().filter(r => r.id == id)
    console.log(reviewsForID);
    
    let total:number = reviewsForID.length

    if (total > 0){
      return  Math.round(reviewsForID.map(r => r.stars).reduce((r1, r2) => r1 + r2) / total)
    } else{
      return 0
    }
  }
}
