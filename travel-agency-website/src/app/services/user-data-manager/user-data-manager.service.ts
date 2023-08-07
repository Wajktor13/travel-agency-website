import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/shared/models/user-data';


@Injectable({
  providedIn: 'root'
})

export class UserDataManagerService {

  constructor(
    private db: AngularFirestore
    ) { }

  public async addUserData(newUserData: UserData): Promise<void> {
    await this.db.collection('users').doc(newUserData.uid).set(newUserData)
  }

  public async getUserDataByUid(uid: string): Promise<UserData> {
    return (await this.db.collection('users').doc(uid).ref.get()).data() as UserData
  }

  public getAllUsersData(): Observable<any> {
    return this.db.collection('users').valueChanges()
  }

  public updateUserData(updatedUserData: UserData): void {    
    this.db.doc(`users/${updatedUserData.uid}`).update(updatedUserData)
  }

  public userExists(uid: string): Promise<boolean> {
    return this.db.collection('users').doc(uid).ref.get().then((doc) => {
      return doc.exists
    })
  }
}
