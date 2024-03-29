import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ExcursionData } from '../../shared/models/excursion-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FilterExcursionsService } from '../filter-excursions/filter-excursions.service';


@Injectable({
  providedIn: 'root'
})

export class ExcursionsDataManagerService implements OnDestroy {
  private fetchedExcursionsData$: Observable<ExcursionData[]>
  public excursionsData$: BehaviorSubject<ExcursionData[]> = new BehaviorSubject([] as ExcursionData[])
  public minUnitPrice$: BehaviorSubject<number> = new BehaviorSubject(Infinity)
  public maxUnitPrice$: BehaviorSubject<number> = new BehaviorSubject(0)
  private fetchedExcursionsDataSub: Subscription | null = null
  private excursionsDataSub: Subscription | null = null

  constructor(
    private db: AngularFirestore,
    private filterExcursionsService: FilterExcursionsService
    ) {
    this.fetchedExcursionsData$ = db.collection('excursions').valueChanges() as Observable<ExcursionData[]>;

    this.fetchedExcursionsDataSub = this.fetchedExcursionsData$.subscribe(
      {
        next: (data: ExcursionData[]) => {
          this.excursionsData$.next(data)
        }
          ,
        error: (err: any) => console.log(err)
      }
    )

    this.excursionsDataSub = this.excursionsData$.subscribe(
      {
        next: (_: any) => {
          this.updateMinMaxPrice()
        },
        error: (err: any) => console.log(err)
      }
    )
  }

  public ngOnDestroy(): void {
    this.fetchedExcursionsDataSub?.unsubscribe()
    this.excursionsDataSub?.unsubscribe()
  }

  private existsInExcursionsData(excursion: ExcursionData): boolean {
    return this.getExcursionsData().includes(excursion)
  }

  public removeFromExcursionsDB(toRemove: ExcursionData): void {

    /*
      uncomment below line to enable permanent deletion from database
    */
    // this.db.collection('excursions').doc(toRemove.id.toString()).delete()

    alert("permanent deletion from database is disabled")

    let currentExcursionsData: ExcursionData[] = this.getExcursionsData()
    currentExcursionsData = currentExcursionsData.filter(e => e.id != toRemove.id)
    this.setExcursionsData(currentExcursionsData)

    this.updateMinMaxPrice()
  }

  public addToExcursionsDB(excursionToAdd: ExcursionData): void {
    this.db.collection('excursions').doc(excursionToAdd.id.toString()).set(excursionToAdd)

    let currentExcursionsData: ExcursionData[] = this.getExcursionsData()
    currentExcursionsData.push(excursionToAdd)
    this.excursionsData$.next(currentExcursionsData)

    this.updateMinMaxPrice()
  }

  public setExcursionsData(newExcursionsData: ExcursionData[]): void {
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

  public getExcursionDetails(id: number): ExcursionData | null {
    for (let excursion of this.getExcursionsData()) {
      if (excursion.id == id) {
        return excursion
      }
    }

    return null
  }

  public validateExcursionData(excursion: ExcursionData): boolean {
    return !this.existsInExcursionsData(excursion)
      && this.validateName(excursion.name) && this.validateCountry(excursion.country) && this.validateStartDate(excursion.startDate) && this.validateEndDate(excursion.startDate, excursion.endDate) && this.validateUnitPrice(excursion.unitPrice) && this.validateInStock(excursion.inStock) &&
      this.validateDescription(excursion.shortDescription) && this.validateImg(excursion.imgs)
  }

  private validateName(name: string): boolean {
    return name.length >= 1
  }

  private validateCountry(country: string): boolean {    
    return country.length >= 4
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

  private validateDescription(_: string): boolean {
    return true
  }

  private validateImg(_: string[]): boolean {
    return true
  }

  public updateMinMaxPrice() {
    let minPrice: number = Infinity
    let maxPrice: number = 0

    for (let excursion of this.filterExcursionsService.filterExcursions(this.getExcursionsData())) {
      minPrice = Math.min(minPrice, excursion.unitPrice)
      maxPrice = Math.max(maxPrice, excursion.unitPrice)
    }

    this.minUnitPrice$.next(minPrice)
    this.maxUnitPrice$.next(maxPrice) 
  }

  public getMinAvailableID(): number {
    let minID = 0
    let data: ExcursionData[] = this.getExcursionsData()
    data.sort((e1, e2) => e1.id - e2.id)
    for (let excursion of data) {
      if (excursion.id != minID) {
        break
      }
      minID++
    }

    return minID
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

    return { id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, inStock: 0, shortDescription: '', imgs: [], reviews: [], longDescription: '' }
  }

  public updateExcursionData(toUpdate: ExcursionData): void {
    this.db.collection('excursions').doc(toUpdate.id.toString()).delete()
    this.db.collection('excursions').doc(toUpdate.id.toString()).set(toUpdate)
  }
}
