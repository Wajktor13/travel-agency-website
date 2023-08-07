import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDataManagerService } from 'src/app/services/user-data-manager/user-data-manager.service';
import { UserData } from 'src/app/shared/models/user-data';
import { UserRoles } from 'src/app/shared/models/user-roles';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit, OnDestroy {
  public allUsersData: UserData[] = []
  private usersDataSub: Subscription | null = null;

  constructor(
    public userDataManager: UserDataManagerService
    ) { }

  public ngOnInit(): void {
    let radio: HTMLInputElement = document.getElementById('radio-account') as HTMLInputElement
    if (radio) {
      radio.checked = true
    }

    this.usersDataSub = this.userDataManager.getAllUsersData().subscribe(
      {
        next:(data)=> this.allUsersData = data as UserData[],
        error: (err) => console.log(err)
      }
    )
  }

  public ngOnDestroy(): void {
    this.usersDataSub?.unsubscribe()
  }

  public reverseBan(userData: UserData): void{
    userData.banned = !userData.banned
    this.userDataManager.updateUserData(userData)
  }

  public changeRoles(userData: UserData ,rolesChange: UserRoles): void {
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
