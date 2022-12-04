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

  removeFromExcursionsData(toRemove: ExcursionData){
    let currentExcursionsData: ExcursionData[] = this.getExcursionsData()
    currentExcursionsData = currentExcursionsData.filter(e => e.id != toRemove.id)
    this.setExcursionsData(currentExcursionsData)
  }

  addToExcursionsData(toAdd: ExcursionData){
    let currentExcursionsData: ExcursionData[] = this.getExcursionsData()
    currentExcursionsData.push(toAdd)
    this.setExcursionsData(currentExcursionsData)
  }

  setExcursionsData(newExcursionsData: ExcursionData[]){
    this.excursionsData.next(newExcursionsData)
  }

  getExcursionsData(): ExcursionData[]{
    return this.excursionsData.getValue()
  }

  getNumberOfExcursion(): number{
    return this.getExcursionsData().length
  }

  validateExcursionData(excursionData: ExcursionData): boolean{
    return this.validateName(excursionData.name) && this.validateCountry(excursionData.country) && 
    this.validateStartDate(excursionData.startDate) && this.validateEndDate(excursionData.startDate, excursionData.endDate) && this.validateUnitPrice(excursionData.unitPrice) && this.validateInStock(excursionData.maxInStock) &&
    this.validateDescription(excursionData.description) && this.validateImg(excursionData.img)
  }

  validateName(name: string): boolean{
    return name.length >= 1
  }

  validateCountry(country: string): boolean{
    return /^[a-zA-Z]+$/.test(country) && country.length >= 4
  }

  validateDate(date: string): boolean{
    return /^\d\d\d\d-\d\d-\d\d$/.test(date)
  }

  validateStartDate(date: string): boolean{
    return this.validateDate(date)
  }

  validateEndDate(startDate: string, endDate: string): boolean{
    return this.validateDate(endDate)
  }

  validateUnitPrice(price: number): boolean{
    return price >= 0
  }

  validateInStock(inStock: number): boolean{
    return inStock >= 0
  }

  validateDescription(description: string): boolean{
    return true
  }

  validateImg(img: string): boolean{
    return true
  }
}
