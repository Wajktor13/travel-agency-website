import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public center: google.maps.LatLngLiteral = { lat: 50.068004, lng: 19.912515 };
  public zoom: number = 13;
  public markerOptions: google.maps.MarkerOptions = { draggable: false };
  public markerPosition: google.maps.LatLngLiteral = { lat: 50.068004, lng: 19.912515 };

  constructor() { }

  public ngOnInit(): void {
    let radio: HTMLInputElement = document.getElementById('radio-home') as HTMLInputElement
    if (radio) {
      radio.checked = true
    }
  }
}

