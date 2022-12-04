import { Pipe, PipeTransform } from '@angular/core';
import { ExcursionData } from '../shared/models/excursions-data';
import { FilterExcursionData } from '../shared/models/filter-excursion-data';


@Pipe({
  name: 'filterExcursions'
})
export class FilterExcursionsPipe implements PipeTransform {

  transform(excursionsData: ExcursionData[], args: FilterExcursionData): ExcursionData[] {
    return excursionsData.filter(e => e.unitPrice >= args.minPrice && e.unitPrice <= args.maxPrice)
  }

}
