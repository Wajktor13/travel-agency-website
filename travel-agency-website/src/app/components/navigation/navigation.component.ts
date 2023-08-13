import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  public isLoggedIn: boolean = false
  public notificationsNumber: number = 0

  constructor(private router: Router, public authService: AuthService, private cartService: CartService, private notificationService: NotificationsService) {
    this.authService.isLoggedIn$.subscribe(
      {
        next: (value) => this.isLoggedIn = value,
        error: (err) => console.log(err)
      }
    )

    this.notificationService.notificationsNumber$.subscribe(
      {
        next: (value) => this.notificationsNumber = value,
        error: (err) => console.log(err)
      }
    )
  }

  public navigateToHome(): void {
    this.router.navigate(['home'])
  }

  public navigateToExcursions(): void {
    this.router.navigate(['excursions'])
  }

  public navigateToManagerPanel(): void {
    this.router.navigate(['manager-panel'])
  }

  public navigateToReservationsHistory(): void {
    this.router.navigate(['reservations-history'])
  }

  public navigateToCart(): void {
    this.router.navigate(['cart'])
  }

  public navigateToLoginRegister(): void{
    this.router.navigate(['login-register'])
  }

  public navigateToAdminPanel(): void{
    this.router.navigate(['admin-panel'])
  }

  public logOutButtonClicked(): void{
    this.authService.logout()
    this.cartService.setCart([])
    alert("Successfully logged out!")
    this.router.navigate(['home'])
  }
}
