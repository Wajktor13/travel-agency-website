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
  public minUnitPrice: BehaviorSubject<number> = new BehaviorSubject(Infinity)
  public maxUnitPrice: BehaviorSubject<number> = new BehaviorSubject(0)
  public minAvailableID: BehaviorSubject<number> = new BehaviorSubject(-1)

  constructor(private httpClient: HttpClient) { 
    this.fetchedData = httpClient.get<ExcursionData[]>(this.DATA_URL)

    this.fetchedData.subscribe(
      {
        next: (data: ExcursionData[]) => this.excursionsData.next(data),
        error: (err: any) => console.log(err)
      }
    )

    this.excursionsData.subscribe(
      {
        next: (excursionsData: ExcursionData[]) =>{
          this.updateMinMaxPrice(excursionsData)
          this.updateMinAvailableID(excursionsData)
        },
        error: (err: any) => console.log(err)  
      }
    )
  }

  public removeFromExcursionsData(toRemove: ExcursionData){
    let currentExcursionsData: ExcursionData[] = this.getExcursionsData()
    currentExcursionsData = currentExcursionsData.filter(e => e.id != toRemove.id)
    this.setExcursionsData(currentExcursionsData)
  }

  public addToExcursionsData(toAdd: ExcursionData){
    let currentExcursionsData: ExcursionData[] = this.getExcursionsData()
    currentExcursionsData.push(toAdd)
    this.setExcursionsData(currentExcursionsData)
  }

  public setExcursionsData(newExcursionsData: ExcursionData[]){
    this.excursionsData.next(newExcursionsData)
  }

  public getExcursionsData(): ExcursionData[]{
    return this.excursionsData.getValue()
  }

  public getNumberOfExcursion(): number{
    return this.getExcursionsData().length
  }

  public validateExcursionData(excursionData: ExcursionData): boolean{
    return  this.validateName(excursionData.name) && this.validateCountry(excursionData.country) && 
    this.validateStartDate(excursionData.startDate) && this.validateEndDate(excursionData.startDate, excursionData.endDate) && this.validateUnitPrice(excursionData.unitPrice) && this.validateInStock(excursionData.maxInStock) &&
    this.validateDescription(excursionData.description) && this.validateImg(excursionData.img)
  }

  private validateName(name: string): boolean{
    return name.length >= 1
  }

  private validateCountry(country: string): boolean{
    return /^[a-zA-Z]+$/.test(country) && country.length >= 4
  }

  private validateDate(date: string): boolean{
    return /^\d\d\d\d-\d\d-\d\d$/.test(date)
  }

  private validateStartDate(date: string): boolean{
    return this.validateDate(date)
  }

  private validateEndDate(startDate: string, endDate: string): boolean{
    return this.validateDate(endDate)
  }

  private validateUnitPrice(price: number): boolean{
    return price >= 0
  }

  private validateInStock(inStock: number): boolean{
    return inStock >= 0
  }

  private validateDescription(description: string): boolean{
    return true
  }

  private validateImg(img: string): boolean{
    return true
  }

  private updateMinMaxPrice(excursionsData: ExcursionData[]){
    let minPrice: number = Infinity
    let maxPrice: number = 0

    for (let excursion of excursionsData){
      minPrice = Math.min(minPrice, excursion.unitPrice)
      maxPrice = Math.max(maxPrice, excursion.unitPrice)
    }

    this.minUnitPrice.next(minPrice)
    this.maxUnitPrice.next(maxPrice)
  }

  private updateMinAvailableID(excursionsData: ExcursionData[]){
    let i = 0
    excursionsData.sort((e1, e2) => e1.id - e2.id)
    for (let excursion of excursionsData){
      if (excursion.id != i){
        break
      }
      i++
    }

    this.minAvailableID.next(i)
  }
}
