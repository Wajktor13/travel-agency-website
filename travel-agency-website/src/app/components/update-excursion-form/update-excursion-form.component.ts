import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExcursionsDataManagerService } from 'src/app/services/excursion-data-manager/excursion-data-manager.service';
import { ExcursionData } from 'src/app/shared/models/excursion-data';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-update-excursion-form',
  templateUrl: './update-excursion-form.component.html',
  styleUrls: ['./update-excursion-form.component.css']
})

export class UpdateExcursionFormComponent implements OnInit, OnDestroy {
  public id: any = -1
  public excursion: ExcursionData = { id: -1, name: '', country: '', startDate: '', endDate: '', unitPrice: 0, inStock: 0, shortDescription: '', imgs: [] , reviews: [], longDescription: ''}
  private excursionsDataSub: Subscription | null = null

  constructor(
    private dataManager: ExcursionsDataManagerService,
    private route: ActivatedRoute,
    private excursionsDataManager: ExcursionsDataManagerService
    ) { }

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.excursion = this.dataManager.getExcursionDataByID(this.id)

    let radio: HTMLInputElement = document.getElementById('radio-account') as HTMLInputElement
    if (radio) {
      radio.checked = true
    }

    this.excursionsDataSub = this.dataManager.excursionsData$.subscribe(
      {
        next: (_) => {
          this.excursion = this.dataManager.getExcursionDataByID(this.id)
        },
        error: (err) => console.log(err)
      }
    )
  }

  public ngOnDestroy(): void {
    this.excursionsDataSub?.unsubscribe()
  }

  public submitClicked(data: any): void {
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