import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/shared/models/user-data';
import { UserRoles } from 'src/app/shared/models/user-roles';


@Injectable({
  providedIn: 'root'
})

export class UserDataManagerService {

  constructor(private db: AngularFirestore) { }

  public async addUserData(newUserData: UserData): Promise<void>{
    await this.db.collection('users').doc(newUserData.uid).set(newUserData)
  }

  public async getUserDataByUid(uid: string) {
    return (await this.db.collection('users').doc(uid).ref.get()).data()
  }

  public getAllUsersData(): Observable<any>{
    return this.db.collection('users').valueChanges()
  }

  public updateUserData(updatedUserData: UserData): void{
    this.db.doc(`users/${updatedUserData.uid}`).update(updatedUserData)
  }
}
