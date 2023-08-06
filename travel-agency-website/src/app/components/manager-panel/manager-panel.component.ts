import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { FilterExcursionsService } from 'src/app/services/filter-excursions/filter-excursions.service';
import { ExcursionData } from 'src/app/shared/models/excursion-data';


@Component({
  selector: 'manager-panel.',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.css']
})

export class ManagerPanelComponent implements OnInit {
  info: string = " (lowest available)"
  public radioExcursionListChecked: boolean = true
  public excursionsData: ExcursionData[] = []
  public textAreaValue: string = ''

  constructor(private excursionDataManager: ExcursionsDataManagerService, private filterService: FilterExcursionsService, private router: Router) {
    excursionDataManager.excursionsData$.subscribe(
      {
        next: (excursionsData: ExcursionData[]) => this.excursionsData = excursionsData,
        error: (err: any) => console.log(err) 
      }
    )
  }

  public ngOnInit(): void {
    let radio: HTMLInputElement = document.getElementById('radio-account') as HTMLInputElement
    if (radio) {
      radio.checked = true
    }
  }

  public getMinAvailableID(): number {
    return this.excursionDataManager.getMinAvailableID()
  }

  public submitClicked(data: any) {
    data["id"] = this.getMinAvailableID()
    data["reviews"] = []
    
    let newExcursionData: ExcursionData = data as ExcursionData

    if (this.excursionDataManager.validateExcursionData(newExcursionData)) {
      this.excursionDataManager.addToExcursionsDB(newExcursionData)
      this.filterService.resetFilters(this.excursionDataManager.getMinPrice(), Math.max(this.excursionDataManager.getMaxPrice(), newExcursionData.unitPrice))
      alert("Success!")

    } else {

      alert("Wrong data or the same excursion already exists!")
    }
  }

  public changePanelOption(): void{
    this.radioExcursionListChecked = !this.radioExcursionListChecked
  }

  public navigateToSingleExcursionView(id: number): void {
    this.router.navigate(['excursion/', id])
  }

  public removeButtonClicked(excursion: ExcursionData): void {
    this.excursionDataManager.removeFromExcursionsDB(excursion)
  }

  public updateButtonClicked(excursion: ExcursionData): void {
    this.router.navigate(['update-excursion-form/', excursion.id])
  }
}
