import { Component, Input } from '@angular/core';
import { ExcursionData } from 'src/app/shared/models/excursions-data';


@Component({
  selector: 'app-excursion-card',
  templateUrl: './excursion-card.component.html',
  styleUrls: ['./excursion-card.component.css']
})

export class ExcursionCardComponent {

  constructor(){}

  @Input() excursionsData: ExcursionData[] = []
}
