import { Injectable } from '@angular/core';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { ReviewData } from 'src/app/shared/models/review-data';
import { ExcursionsDataManagerService } from '../excursion-data-manager/excursion-data-manager.service';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})

export class ReviewsService {

  constructor(
    private excursionsDataManager: ExcursionsDataManagerService,
    private authService: AuthService
    ) { }

  public validateReview(newReview: ReviewData): boolean {
    return this.validateNick(newReview.nick) && this.validateStars(newReview.stars) && this.validateText(newReview.text)
  }

  private validateNick(nick: string): boolean {
    return nick.length >= 3
  }

  private validateStars(stars: number): boolean {
    if (stars > 0) {
      return true
    } else {
      return this.authService.checkRolesForPostingReviewWithoutStars()
    }
  }

  private validateText(text: string): boolean {
    return text.length > 50 && text.length < 500
  }

  public addReview(newReview: ReviewData, excursionData: ExcursionData): void {
    excursionData.reviews.push(newReview)
    this.excursionsDataManager.updateExcursionData(excursionData)
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
