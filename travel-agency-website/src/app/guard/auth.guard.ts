import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  public isLoggedIn: boolean = false

  constructor(private authService: AuthService, private router: Router){
    this.authService.isLoggedIn.subscribe(
      {
        next: (value) => this.isLoggedIn = value,
        error: (err) => console.log(err)
      }
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isLoggedIn !== true) {
        this.router.navigate(['login-register'])
        }

    return true;
  }
  
}
