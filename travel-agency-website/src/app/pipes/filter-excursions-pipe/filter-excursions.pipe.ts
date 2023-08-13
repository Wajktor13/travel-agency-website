import { Pipe, PipeTransform } from '@angular/core';
import { ExcursionData } from '../../shared/models/excursion-data';
import { FilterArguments } from '../../shared/models/filter-arguments';
import { FilterExcursionsService } from 'src/app/services/filter-excursions/filter-excursions.service';


@Pipe({
  name: 'filterExcursions'
})

export class FilterExcursionsPipe implements PipeTransform {

  constructor(
    private filterExcursionsService: FilterExcursionsService
    ) { }

  public transform(excursionsData: ExcursionData[], _: FilterArguments): ExcursionData[] {
    return this.filterExcursionsService.filterExcursions(excursionsData);
  }
}
