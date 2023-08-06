import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})

export class PageNotFoundComponent implements OnInit {

  public ngOnInit(): void {
    let radio: HTMLInputElement = document.getElementById('radio-home') as HTMLInputElement
    if (radio) {
      radio.checked = true
    }
  }
}

