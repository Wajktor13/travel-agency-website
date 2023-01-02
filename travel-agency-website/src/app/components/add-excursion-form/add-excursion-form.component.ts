import { Component } from '@angular/core';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { FilterExcursionsService } from 'src/app/services/filter-excursions/filter-excursions.service';
import { ExcursionData } from 'src/app/shared/models/excursion-data';

@Component({
  selector: 'app-add-excursion-form',
  templateUrl: './add-excursion-form.component.html',
  styleUrls: ['./add-excursion-form.component.css']
})

export class AddExcursionFormComponent {
  info: string = " (lowest available)"

  constructor(private excursionDataManager: ExcursionDataManagerService, private filterService: FilterExcursionsService) { }

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

      alert("Wrong data or excursion the same excursion already exists!")
    }
  }
}
