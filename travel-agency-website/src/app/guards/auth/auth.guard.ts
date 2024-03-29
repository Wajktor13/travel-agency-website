import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDataManagerService } from 'src/app/services/user-data-manager/user-data-manager.service';
import { UserData } from 'src/app/shared/models/user-data';
import { UserRoles } from 'src/app/shared/models/user-roles';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userDataManager: UserDataManagerService
    ) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let requiredRoles: UserRoles = route.data as UserRoles
    let userID: string | null = localStorage.getItem("user")

    if (userID) {
      let user: UserData = await this.userDataManager.getUserDataByUid(localStorage.getItem("user")!) as UserData
      if (user && this.checkRoles(requiredRoles, user.roles)){
        return true
      } else{
        alert("You don't have permission to view this site.")
        this.router.navigate(['home'])
          .then(() => {
            window.location.reload();
          });
        return false
      }
    }
     else{
      alert("Aavailable for logged in users only.")
      this.router.navigate(['login-register'])
        .then(() => {
          window.location.reload();
        });
      return false
    }
  }

  private checkRoles(requiredRoles: UserRoles, currentUserRoles: UserRoles): boolean {
    if (requiredRoles.customer && currentUserRoles.customer){
      return true
    } else if (requiredRoles.manager && currentUserRoles.manager){
      return true
    } else if (requiredRoles.admin && currentUserRoles.admin){
      return true
    } else{
      return false
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
