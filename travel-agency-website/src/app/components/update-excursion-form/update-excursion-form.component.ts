import { Component } from '@angular/core';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-excursion-form',
  templateUrl: './update-excursion-form.component.html',
  styleUrls: ['./update-excursion-form.component.css']
})

export class UpdateExcursionFormComponent  {
  public id: any = -1
  public excursion: ExcursionData = { id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, inStock: 0, shortDescription: '', imgs: [] , reviews: [], longDescription: ''}

  constructor(private dataManager: ExcursionsDataManagerService, private route: ActivatedRoute, private excursionsDataManager: ExcursionsDataManagerService) { 
    this.dataManager.excursionsData$.subscribe(
      {
        next: (data) => {
          this.excursion = this.dataManager.getExcursionDataByID(this.id)
        },
        error: (err) => console.log(err)
      }
    )
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.excursion = this.dataManager.getExcursionDataByID(this.id)
  }

  public submitClicked(data: any) {
    let excursionData: ExcursionData = data as ExcursionData
    excursionData.id = this.id
    excursionData.reviews = this.excursion.reviews

    if (!Array.isArray(excursionData.imgs)) {
      let imgsString: string = excursionData.imgs as string
      excursionData.imgs = imgsString.split(',')
    }
    
    if (!this.excursionsDataManager.validateExcursionData(excursionData)) {
      alert('Wrong data!')
      return
    }

    this.excursionsDataManager.updateExcursionData(excursionData)
    alert('Excursion updated successfully!')
  }
}
