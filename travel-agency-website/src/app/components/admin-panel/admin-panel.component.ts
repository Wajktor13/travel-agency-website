import { Component } from '@angular/core';
import { UserDataManagerService } from 'src/app/services/user-data-manager/user-data-manager.service';
import { UserData } from 'src/app/shared/models/user-data';
import { UserRoles } from 'src/app/shared/models/user-roles';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent {
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

  public changeRoles(userData: UserData ,rolesChange: UserRoles): void{
    if(rolesChange.customer){
      userData.roles.customer = !userData.roles.customer
    }

    if(rolesChange.manager){
      userData.roles.manager = !userData.roles.manager
    }

    if(rolesChange.admin){
      userData.roles.admin = !userData.roles.admin
    }

    this.userDataManager.updateUserData(userData)
  }
}
