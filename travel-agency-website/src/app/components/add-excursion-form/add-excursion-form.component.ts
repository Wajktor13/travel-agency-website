import { Component } from '@angular/core';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ExcursionData } from 'src/app/shared/models/excursions-data';

@Component({
  selector: 'app-add-excursion-form',
  templateUrl: './add-excursion-form.component.html',
  styleUrls: ['./add-excursion-form.component.css']
})
export class AddExcursionFormComponent {
  public lowestFreeID:number = 100

  constructor(private dataManager: ExcursionDataManagerService){}

  submitClicked(data: any){
    data["id"] = this.lowestFreeID
    let newExcursionData: ExcursionData = data as ExcursionData

    if (this.dataManager.validateExcursionData(newExcursionData)){
      this.dataManager.addToExcursionsData(newExcursionData)
      alert("Success!")
    } else{
      alert("Wrong data!")
    }
  }
}
