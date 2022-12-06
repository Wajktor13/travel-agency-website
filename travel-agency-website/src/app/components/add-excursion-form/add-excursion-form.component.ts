import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExcursionDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ExcursionData } from 'src/app/shared/models/excursions-data';

@Component({
  selector: 'app-add-excursion-form',
  templateUrl: './add-excursion-form.component.html',
  styleUrls: ['./add-excursion-form.component.css']
})

export class AddExcursionFormComponent {

  constructor(private dataManager: ExcursionDataManagerService, private router: Router){
  }

  getMinAvailableID(): number{
    return this.dataManager.getMinAvailableID()
  }

  submitClicked(data: any){
    data["id"] = this.getMinAvailableID()
    let newExcursionData: ExcursionData = data as ExcursionData

    if (this.dataManager.validateExcursionData(newExcursionData)){
      this.dataManager.addToExcursionsData(newExcursionData)
      alert("Success!")
    } else{
      alert("Wrong data or excursion the same excursion already exists!")
    }
  }
}
