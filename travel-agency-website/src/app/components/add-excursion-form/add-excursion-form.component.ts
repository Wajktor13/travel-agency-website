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
  public minAvailableID:number = -1

  constructor(private dataManager: ExcursionDataManagerService, private router: Router){
    dataManager.minAvailableID.subscribe(
      {
        next: (id: number) => this.minAvailableID = id,
        error: (error: any) => console.log(error)
      }
    )
  }

  submitClicked(data: any){
    data["id"] = this.minAvailableID
    let newExcursionData: ExcursionData = data as ExcursionData

    if (this.dataManager.validateExcursionData(newExcursionData)){
      this.dataManager.addToExcursionsData(newExcursionData)
      this.router.navigate(['/excursions'])
      alert("Success!")
    } else{
      alert("Wrong data!")
    }
  }
}
