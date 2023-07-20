import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { FilterExcursionsService } from 'src/app/services/filter-excursions/filter-excursions.service';
import { ExcursionData } from 'src/app/shared/models/excursion-data';


@Component({
  selector: 'app-add-excursion-form',
  templateUrl: './add-excursion-form.component.html',
  styleUrls: ['./add-excursion-form.component.css']
})

export class AddExcursionFormComponent {
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

  public getMinAvailableID(): number {
    return this.excursionDataManager.getMinAvailableID()
  }

  public submitClicked(data: any) {
    data["id"] = this.getMinAvailableID()
    data["reviews"] = []
    data["longDescription"] = this.textAreaValue
    
    let newExcursionData: ExcursionData = data as ExcursionData

    if (this.excursionDataManager.validateExcursionData(newExcursionData)) {
      this.excursionDataManager.addToExcursionsDB(newExcursionData)
      this.filterService.resetFilters(this.excursionDataManager.getMinPrice(), Math.max(this.excursionDataManager.getMaxPrice(), newExcursionData.unitPrice))
      alert("Success!")

    } else {

      alert("Wrong data or the same excursion already exists!")
    }
  }

  public changePanelOption(event: any): void{
    let value: string = event.target.value

    if (value == "1"){
      this.radioExcursionListChecked = true
    } else{
      this.radioExcursionListChecked = false
    }
  }

  public navigateToSingleExcursionView(id: number): void {
    this.router.navigate(['excursion/', id])
  }

  public removeButtonClicked(excursion: ExcursionData): void {
    this.excursionDataManager.removeFromExcursionsDB(excursion)
  }

  public updateButtonClicked(excursion: ExcursionData): void {
    alert('Updating excursion is currently not available!')
  }
}
