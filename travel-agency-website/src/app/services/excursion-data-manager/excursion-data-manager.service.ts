import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExcursionData } from '../../shared/models/excursion-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class ExcursionDataManagerService {
  private fetchedData$: Observable<ExcursionData[]>
  public excursionsData$: BehaviorSubject<ExcursionData[]> = new BehaviorSubject([] as ExcursionData[])
  public minUnitPrice$: BehaviorSubject<number> = new BehaviorSubject(Infinity)
  public maxUnitPrice$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private db: AngularFirestore) {
    this.fetchedData$ = db.collection('excursions').valueChanges() as Observable<ExcursionData[]>;

    this.fetchedData$.subscribe(
      {
        next: (data: ExcursionData[]) => this.excursionsData$.next(data),
        error: (err: any) => console.log(err)
      }
    )

    this.excursionsData$.subscribe(
      {
        next: (excursionsData: ExcursionData[]) => {
          this.updateMinMaxPrice(excursionsData)
        },
        error: (err: any) => console.log(err)
      }
    )
  }

  private existsInExcursionsData(excursion: ExcursionData): boolean {
    return this.getExcursionsData().includes(excursion)
  }

  public removeFromExcursionsDB(toRemove: ExcursionData) {

    /*
     uncomment below line to enable permanent deletion of data from database
    */

    this.db.collection('excursions').doc(toRemove.id.toString()).delete()

    let currentExcursionsData: ExcursionData[] = this.getExcursionsData()
    currentExcursionsData = currentExcursionsData.filter(e => e.id != toRemove.id)
    this.setExcursionsData(currentExcursionsData)

    this.updateMinMaxPrice(this.getExcursionsData())
  }

  public addToExcursionsDB(toAdd: ExcursionData) {
    this.db.collection('excursions').doc(toAdd.id.toString()).set(toAdd)

    let currentExcursionsData: ExcursionData[] = this.getExcursionsData()
    currentExcursionsData.push(toAdd)
    this.excursionsData$.next(currentExcursionsData)

    this.updateMinMaxPrice(this.getExcursionsData())
  }

  public setExcursionsData(newExcursionsData: ExcursionData[]) {
    this.excursionsData$.next(newExcursionsData)
  }

  public getExcursionsData(): ExcursionData[] {
    return this.excursionsData$.getValue()
  }

  public getNumberOfExcursion(): number {
    return this.getExcursionsData().length
  }

  public getCountries(): string[] {
    return this.getExcursionsData().map(e => e.country).filter((value, i, arr) => arr.indexOf(value) == i)
  }

  public getMinPrice(): number {
    return this.minUnitPrice$.getValue()
  }

  public getMaxPrice(): number {
    return this.maxUnitPrice$.getValue()
  }

  public validateExcursionData(excursion: ExcursionData): boolean {
    return !this.existsInExcursionsData(excursion)
      && this.validateName(excursion.name) && this.validateCountry(excursion.country) && this.validateStartDate(excursion.startDate) && this.validateEndDate(excursion.startDate, excursion.endDate) && this.validateUnitPrice(excursion.unitPrice) && this.validateInStock(excursion.inStock) &&
      this.validateDescription(excursion.shortDescription) && this.validateImg(excursion.img)
  }

  private validateName(name: string): boolean {
    return name.length >= 1
  }

  private validateCountry(country: string): boolean {    
    return /^[A-Z][a-z ]*$/.test(country) && country.length >= 4
  }

  private validateDate(date: string): boolean {
    return /^\d\d\d\d-\d\d-\d\d$/.test(date)
  }

  private validateStartDate(date: string): boolean {
    return this.validateDate(date)
  }

  private validateEndDate(startDate: string, endDate: string): boolean {
    return this.validateDate(endDate) && new Date(startDate) < new Date(endDate)
  }

  private validateUnitPrice(price: number): boolean {
    return price >= 0
  }

  private validateInStock(inStock: number): boolean {
    return inStock >= 0
  }

  private validateDescription(description: string): boolean {
    return true
  }

  private validateImg(img: string): boolean {
    return true
  }

  private updateMinMaxPrice(excursionsData: ExcursionData[]) {
    let minPrice: number = Infinity
    let maxPrice: number = 0

    for (let excursion of excursionsData) {
      minPrice = Math.min(minPrice, excursion.unitPrice)
      maxPrice = Math.max(maxPrice, excursion.unitPrice)
    }

    this.minUnitPrice$.next(minPrice)
    this.maxUnitPrice$.next(maxPrice)
     
  }

  public getMinAvailableID(): number {
    let i = 0
    let data: ExcursionData[] = this.getExcursionsData()
    data.sort((e1, e2) => e1.id - e2.id)
    for (let excursion of data) {
      if (excursion.id != i) {
        break
      }
      i++
    }

    return i
  }

  public getPriceByID(id: number): number {
    let e: ExcursionData = this.getExcursionDataByID(id)
    if (e.id == id) {
      return e.unitPrice
    }

    return 0
  }

  public getExcursionDataByID(id: number): ExcursionData {
    for (let excursion of this.getExcursionsData()) {
      if (excursion.id == id) {
        return excursion
      }
    }

    return { id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, inStock: 0, shortDescription: '', img: '', reviews: [], longDescription: '' }
  }

  public updateExcursionData(toUpdate: ExcursionData): void{
    this.db.collection('excursions').doc(toUpdate.id.toString()).delete()
    this.db.collection('excursions').doc(toUpdate.id.toString()).set(toUpdate)
  }
}
