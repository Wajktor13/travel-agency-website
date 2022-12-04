import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'travel-agency-website';
  
  constructor(private router: Router){}

  navigateToExcursions(){
    this.router.navigate(['/excursions'])
  }

  navigateToCart(){
    this.router.navigate(['/cart'])
  }

  navigateToExcursionForm(){
    this.router.navigate(['/add-excursion-form'])
  }
}
