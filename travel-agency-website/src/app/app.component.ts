import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'travel-agency-website';
  public isLoggedIn: boolean = false
  public nickname: string = 'logged out'

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn.subscribe(
      {
        next: (value) => this.isLoggedIn = value,
        error: (err) => console.log(err)
      }
    )

    this.authService.nickname.subscribe(
      {
        next: (nickname) => this.nickname = nickname,
        error: (err) => console.log(err)
      })
   }

  navigateToHome(): void {
    this.router.navigate(['home'])
  }

  navigateToExcursions(): void {
    this.router.navigate(['excursions'])
  }

  navigateToAddExcursionForm(): void {
    this.router.navigate(['add-excursion-form'])
  }

  navigateToAddReservationsHistory(): void {
    this.router.navigate(['reservations-history'])
  }

  navigateToCart(): void {
    this.router.navigate(['cart'])
  }

  navigateToLoginRegister(): void{
    this.router.navigate(['login-register'])
  }

  logOutButtonClicked(): void{
    this.authService.logout()
    alert("Successfully logged out!")
    this.router.navigate(['home'])
  }
}
