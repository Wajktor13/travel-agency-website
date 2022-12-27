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

  public async register(email: string, password: string, nickname: string, roles: UserRoles = { customer: true, manager: false, admin: false }): Promise<void> {
    this.logout()

    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(async (registerData) => {
        registerData.user?.updateProfile({ displayName: nickname, photoURL: "" })
        await this.userDataManger.addUserData(registerData.user?.uid!, false, roles)
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
    return this.currentUser.getValue()
  }

  public isLoggedIn(): boolean{
    return this.isLoggedIn$.getValue()
  }
}
