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

  navigateToHome(): void{
    this.router.navigate(['home'])
  }

  navigateToExcursions(): void{
    this.router.navigate(['excursions'])
  }

  navigateToAddExcursionForm(): void{
    this.router.navigate(['add-excursion-form'])
  }

  navigateToAddReservationsHistory(): void{
    this.router.navigate(['reservations-history'])
  }

  navigateToCart(): void{
    this.router.navigate(['cart'])
  }
}
