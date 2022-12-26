import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserData } from './shared/models/user-data';
import { UserRoles } from './shared/models/user-roles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isLoggedIn: boolean = false

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(
      {
        next: (value) => this.isLoggedIn = value,
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

  public navigateToAddExcursionForm(): void {
    this.router.navigate(['add-excursion-form'])
  }

  public navigateToAddReservationsHistory(): void {
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
    alert("Successfully logged out!")
    this.router.navigate(['home'])
  }

  public checkRolesForAddingExcursions(): boolean{
    if (this.authService.isLoggedIn()){
      let currentUserRoles: UserRoles = this.authService.getCurrentUser().roles
      return currentUserRoles.manager || currentUserRoles.admin
    } else{
      return false
    }
  }

  public checkRolesForReservationsHistory(): boolean{
    if (this.authService.isLoggedIn()){
      return this.authService.getCurrentUser().roles.customer
    } else{
      return false
    }
  }

  public checkRolesForAdminPanel(): boolean{
    if (this.authService.isLoggedIn()){
      return this.authService.getCurrentUser().roles.admin
    } else{
      return false
    }
  }

  public getNickname(): string{
    let user: UserData = this.authService.getCurrentUser()
    
    if (this.authService.isLoggedIn()){
      if(user.roles.admin){
        return "Admin"
      } else if (user.roles.manager){
        return "Manager"
      } else{
        return user.nickname + " (default user)"
      }
    } else{
      return "logged out"
    }
  }
}
