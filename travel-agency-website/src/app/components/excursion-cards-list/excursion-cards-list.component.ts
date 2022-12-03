import { Component } from '@angular/core';
import { ExcursionData } from 'src/app/shared/models/excursions-data';
import { ExcursionDataFetcherService } from 'src/app/shared/services/excursion-data-fetcher.service';


@Component({
  selector: 'app-excursion-cards-list',
  templateUrl: './excursion-cards-list.component.html',
  styleUrls: ['./excursion-cards-list.component.css']
})

export class ExcursionCardsListComponent {
  public excursionsData: ExcursionData[] = []

  constructor(private excursionDataFetcher: ExcursionDataFetcherService){
    excursionDataFetcher.excursionsData.subscribe(
      {
        next: (excursionsData: ExcursionData[]) => this.excursionsData = excursionsData,
        error: (err: any) => console.log(err)
      }
    )
  }
}
