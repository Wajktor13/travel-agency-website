import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReviewData } from 'src/app/shared/models/review-data';


@Injectable({
  providedIn: 'root'
})

export class ReviewsService {

  public reviewsData: BehaviorSubject<ReviewData[]> = new BehaviorSubject([] as ReviewData[])

  constructor() { }

  public getReviewsData(): ReviewData[] {
    return this.reviewsData.getValue()
  }

  public getReviewsByID(id: number): ReviewData[] {
    return this.getReviewsData().filter(review => review.id == id)
  }

  public validateReview(review: ReviewData): boolean {
    return this.validateNick(review.nick) && this.validateStars(review.stars) && this.validateText(review.text)
  }

  private validateNick(nick: string): boolean {
    return nick.length >= 3
  }

  private validateStars(stars: number): boolean {
    return stars > 0
  }

  private validateText(text: string): boolean {
    return text.length > 50 && text.length < 500
  }

  public addReview(review: ReviewData): void {
    let current: ReviewData[] = this.getReviewsData()
    current.push(review)
    this.reviewsData.next(current)
  }

  public getAverageStarsByID(id: number): number {
    let reviewsForID: ReviewData[] = this.getReviewsData().filter(r => r.id == id)

    let total: number = reviewsForID.length

    if (total > 0) {
      return reviewsForID.map(r => r.stars).reduce((r1, r2) => r1 + r2) / total
    } else {
      return 0
    }
  }
}
