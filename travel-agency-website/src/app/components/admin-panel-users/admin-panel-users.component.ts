import { Component } from '@angular/core';
import { UserDataManagerService } from 'src/app/services/user-data-manager/user-data-manager.service';
import { UserData } from 'src/app/shared/models/user-data';


@Component({
  selector: 'app-admin-panel-users',
  templateUrl: './admin-panel-users.component.html',
  styleUrls: ['./admin-panel-users.component.css']
})

export class AdminPanelUsersComponent {
  public allUsersData: UserData[] = []

  constructor(public userDataManager: UserDataManagerService){

    this.userDataManager.getAllUsersData().subscribe(
      {
        next:(data)=> this.allUsersData = data as UserData[],
        error: (err) => console.log(err)
      }
    )
  }

  public reverseBan(userData: UserData): void{
    userData.banned = !userData.banned
    this.userDataManager.updateUserData(userData)
  }
}
