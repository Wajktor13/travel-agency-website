import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserRoles } from 'src/app/shared/models/user-roles';


@Injectable({
  providedIn: 'root'
})

export class UserDataManagerService {

  constructor(private db: AngularFirestore) { }

  public async addUserData(uid: string, banned: boolean, roles: UserRoles): Promise<void>{
    await this.db.collection('users').doc(uid).set({uid: uid, banned: banned, roles: roles})
  }

  public async getUserDataByUid(uid: string) {
    return (await this.db.collection('users').doc(uid).ref.get()).data()
  }
}
