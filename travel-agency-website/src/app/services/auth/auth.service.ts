import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart-item';
import { ReservationData } from 'src/app/shared/models/reservation-data';
import { UserData } from 'src/app/shared/models/user-data';
import { UserRoles } from 'src/app/shared/models/user-roles';
import { UserDataManagerService } from '../user-data-manager/user-data-manager.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public currentUser$: BehaviorSubject<UserData> = new BehaviorSubject({ uid:"",banned: true, roles: {} as UserRoles, inCart: [], reservations: [], email: "", nickname: ""} as UserData)

  constructor(private fireAuth: AngularFireAuth, private userDataManger: UserDataManagerService) {
    this.fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        let userData = (await this.userDataManger.getUserDataByUid(user.uid)) as { uid: string, banned: boolean, roles: UserRoles, inCart: CartItem[], reservations: ReservationData[] }
        this.isLoggedIn$.next(true)

        this.currentUser$.next({ uid: user.uid, email: user.email!, nickname: user.displayName!, roles: userData.roles, banned: userData.banned, inCart: userData.inCart, reservations: userData.reservations })
      } else {
        this.isLoggedIn$.next(false)
      }
    })
  }

  public async register(email: string, password: string, nickname: string, roles: UserRoles = { customer: true, manager: false, admin: false }): Promise<void> {
    this.logout()

    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(async (registerData) => {
        registerData.user?.updateProfile({ displayName: nickname, photoURL: "" })
        await this.userDataManger.addUserData({uid: registerData.user?.uid!, email: email, nickname: nickname, roles: roles, banned: false, inCart: [], reservations: []})
        alert("Successfully registered!")
        this.logout()
      })
      .catch((error) => {
        alert(error.code.slice(5))
      })
  }

  public login(email: string, password: string): void {
    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((loginData) => {
        localStorage.setItem("user", loginData.user?.uid!)
        alert("Successfully logged in!")
      })
      .catch((error) => {
        alert(error.code.slice(5))
      })
  }

  public logout(): void {
    localStorage.removeItem("user")
    this.fireAuth.signOut()
  }

  public getCurrentUser(): UserData{
    return this.currentUser$.getValue()
  }

  public isLoggedIn(): boolean{
    return this.isLoggedIn$.getValue()
  }

  public getTitle(): string{
    let user: UserData = this.getCurrentUser()

    if (this.isLoggedIn()){
      if(user.roles.admin){
        return user.nickname + " (admin)"
      } else if (user.roles.manager){
        return user.nickname + " (manager)"
      } else{
        return user.nickname + " (customer)"
      }
    } else{
      return "logged out"
    }
  }
}
