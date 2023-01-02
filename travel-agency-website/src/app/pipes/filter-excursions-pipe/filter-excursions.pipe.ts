import { Pipe, PipeTransform } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ExcursionData } from '../../shared/models/excursion-data';
import { FilterArguments } from '../../shared/models/filter-arguments';


@Pipe({
  name: 'filterExcursions'
})

export class FilterExcursionsPipe implements PipeTransform {

  constructor(private reviewsService: ReviewsService) { }

  transform(excursionsData: ExcursionData[], args: FilterArguments): ExcursionData[] {
    return excursionsData.filter((e) => {
      return this.priceFilter(e, args.minPrice, args.maxPrice) && this.dateFilter(e, args.fromDate, args.toDate) && this.countryFilter(e, args.country) && this.starsFilter(e, args.minStars, args.maxStars, args.noReviews)

    }
    )
  }

  private priceFilter(e: ExcursionData, minPrice: number, maxPrice: number): boolean {
    return e.unitPrice >= minPrice && e.unitPrice <= maxPrice
  }

  private dateFilter(e: ExcursionData, selectedFromDate: string, selectedToDate: string): boolean {
    let selectedFromDateMs: number = Date.parse(selectedFromDate)
    let selectedToDateMs: number = Date.parse(selectedToDate)
    let eFromDateMS: number = Date.parse(e.startDate)
    let eToDateMS: number = Date.parse(e.endDate)

    if (!isNaN(selectedFromDateMs) && !isNaN(selectedToDateMs)) {

      return eFromDateMS >= selectedFromDateMs && eToDateMS <= selectedToDateMs

    } else if (!isNaN(selectedFromDateMs)) {

      return eFromDateMS >= selectedFromDateMs

    } else if (!isNaN(selectedToDateMs)) {

      return eToDateMS <= selectedToDateMs

    } else {

      return true

    }
  }

  private countryFilter(e: ExcursionData, selectedCountry: string) {
    return e.country == selectedCountry || selectedCountry == 'all'
  }

  private starsFilter(e: ExcursionData, minStars: number, maxStars: number, noReviews: boolean) {
    let stars: number = this.reviewsService.getAverageStars(e.reviews)

    return stars >= minStars && stars <= maxStars || (noReviews && stars == 0)
  }
}
