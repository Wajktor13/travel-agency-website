import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent {
  public radioLoginChecked: boolean = true
  public nickname: string = ''
  public email: string = ''
  public password: string = ''

  constructor(private authService: AuthService){}

  public changeLoginRegister(event: any): void{
    let value: string = event.target.value

    if (value =="1"){
      this.radioLoginChecked = true
    } else{
      this.radioLoginChecked = false
    }
  }

  public loginButtonClicked(): void{
    this.authService.login(this.email, this.password)
  }

  public registerButtonClicked(): void{
    this.authService.register(this.email, this.password, this.nickname)
  }
}
