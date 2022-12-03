import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExcursionData } from '../../shared/models/excursions-data';


@Injectable({
  providedIn: 'root'
})

export class ExcursionDataManagerService {
  private DATA_URL:string = 'http://localhost:3000/excursion-data'
  private fetchedData: Observable<ExcursionData[]>
  public excursionsData: BehaviorSubject<ExcursionData[]> = new BehaviorSubject([]as ExcursionData[])

  constructor(private httpClient: HttpClient) { 
    this.fetchedData = httpClient.get<ExcursionData[]>(this.DATA_URL)
    this.fetchedData.subscribe(
      {
        next: (data: ExcursionData[]) => this.excursionsData.next(data),
        error: (err: any) => console.log(err)
      }
    )
  }

  setExcursionsData(newExcursionsData: ExcursionData[]){
    this.excursionsData.next(newExcursionsData)
  }
}
