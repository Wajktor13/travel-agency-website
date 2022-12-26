import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { UserData } from 'src/app/shared/models/user-data';
import { UserRoles } from 'src/app/shared/models/user-roles';
import { UserDataManagerService } from '../user-data-manager/user-data-manager.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public currentUser: BehaviorSubject<UserData> = new BehaviorSubject({} as UserData)

  constructor(private fireAuth: AngularFireAuth, private userDataManger: UserDataManagerService) {
    this.fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        let userData = (await this.userDataManger.getUserDataByUid(user.uid)) as { uid: number, banned: boolean, roles: UserRoles }
        this.isLoggedIn$.next(true)

        this.currentUser.next({ uid: user.uid, email: user.email!, nickname: user.displayName!, roles: userData.roles, banned: userData.banned })
      } else {
        this.isLoggedIn$.next(false)
      }
    })
  }

  public register(email: string, password: string, nickname: string, roles: UserRoles = { customer: true, manager: false, admin: false }): void {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((registerData) => {
        registerData.user?.updateProfile({ displayName: nickname, photoURL: "" })
        this.userDataManger.addUserData(registerData.user?.uid!, false, roles)

        alert("Successfully registered!")
      })
      .catch((error) => {
        alert(error.code.slice(5))
      })
  }

  public login(email: string, password: string): void {
    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((loginData) => {
        alert("Successfully logged in!")
      })
      .catch((error) => {
        alert(error.code.slice(5))
      })
  }

  public logout(): void {
    this.fireAuth.signOut()
  }

  public getCurrentUser(): UserData{
    return this.currentUser.getValue()
  }

  public isLoggedIn(): boolean{
    return this.isLoggedIn$.getValue()
  }
}
