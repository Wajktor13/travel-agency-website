import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public nickname: BehaviorSubject<string> = new BehaviorSubject("logged out")

  constructor(private fireAuth: AngularFireAuth) { 
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn.next(true)
        this.nickname.next(user.displayName!)
      } else {
        this.isLoggedIn.next(false)
        this.nickname.next("logged out")
      } 
    })
  }

  public register(email: string, password: string, nickname: string): void{
      this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((registerData) => {
          registerData.user?.updateProfile({displayName: nickname, photoURL: ""})

          alert("Successfully registered!")
        })
      .catch((error) =>{
        alert(error.code.slice(5))
      })
  }

  public login(email: string, password: string): void{
    this.fireAuth.signInWithEmailAndPassword(email, password)
    .then((loginData) => {
      alert("Logged in as: " + loginData.user?.displayName)
    })
    .catch((error) => {
      alert(error.code.slice(5))
    })
  }

  public logout(): void{
    this.fireAuth.signOut()
  }
}
