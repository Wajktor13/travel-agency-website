import { Component, Input } from '@angular/core';
import { ExcursionData } from 'src/app/shared/models/excursions-data';


@Component({
  selector: 'app-excursion-card',
  templateUrl: './excursion-card.component.html',
  styleUrls: ['./excursion-card.component.css']
})

export class ExcursionCardComponent {
  public currentParticipants: number = 0
  constructor(){}

  @Input() excursion: ExcursionData = {name: '', country: '', startDate: '', endDate: '', unitPrice: 0, maxParticipants: 0, description: '', img: ''}

  changeCurrentParticipants(diff: number){
    this.currentParticipants += diff
  }
}
