import { Component, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { CartService } from './services/cart/cart.service';
import { NotificationsService } from './services/notifications/notifications.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isLoggedIn: boolean = false
  public notificationsNumber: number = 0

  constructor(private router: Router, public authService: AuthService, private cartService: CartService, private notificationService: NotificationsService) {
    this.authService.isLoggedIn$.subscribe(
      {
        next: (value) => this.isLoggedIn = value,
        error: (err) => console.log(err)
      }
    )

    this.notificationService.$notificationsNumber.subscribe(
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

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: any) {
    if (localStorage.getItem("keepLoggedIn") != "true"){
      this.authService.logout()
      localStorage.clear()
    }
  }
}
