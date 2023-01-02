import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { ReviewData } from 'src/app/shared/models/review-data';
import { UserData } from 'src/app/shared/models/user-data';
import { ExcursionDataManagerService } from '../excursion-data-manager/excursion-data-manager.service';
import { UserDataManagerService } from '../user-data-manager/user-data-manager.service';


@Injectable({
  providedIn: 'root'
})

export class ReviewsService {

  constructor(private excurionDataManager: ExcursionDataManagerService) { }

  public validateReview(newReview: ReviewData, reviews: ReviewData[]): boolean {
    return this.validateNumberOfReviews(newReview, reviews) && this.validateNick(newReview.nick) && this.validateStars(newReview.stars, newReview.nick) && this.validateText(newReview.text)
  }

  private validateNumberOfReviews(newReview: ReviewData, reviews: ReviewData[]): boolean{
    return !reviews.map(r => r.uid).includes(newReview.uid)
  }

  private validateNick(nick: string): boolean {
    return nick.length >= 3
  }

  private validateStars(stars: number, nick: string): boolean {
    if (!nick.includes("(customer)")) {
      return true
    } else {
      return stars > 0
    }
  }

  private validateText(text: string): boolean {
    return text.length > 50 && text.length < 500
  }

  public addReview(newReview: ReviewData, excursionData: ExcursionData): void {
    excursionData.reviews.push(newReview)
    this.excurionDataManager.updateExcursionData(excursionData)
  }

  public getAverageStars(reviews: ReviewData[]): number {

    if (reviews.length > 0) {
      let total: number = reviews.length - reviews.filter(r => r.stars == 0).map(r => r.stars).reduce((r1, r2) => r1 + r2, 0)

      if (total > 0) {
        return reviews.map(r => r.stars).reduce((r1, r2) => r1 + r2, 0) / total
      }
    }
    return 0
  }
}
