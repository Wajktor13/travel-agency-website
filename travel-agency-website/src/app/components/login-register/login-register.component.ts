import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {
  public radioLoginChecked: boolean = true
  public nickname: string = ''
  public email: string = ''
  public password: string = ''

  constructor(
    public authService: AuthService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    let radio: HTMLInputElement = document.getElementById('radio-account') as HTMLInputElement
    if (radio) {
      radio.checked = true
    }
  }

  public changeLoginRegister(): void {
    this.radioLoginChecked = !this.radioLoginChecked
  }

  public async loginButtonClicked(): Promise<void> {
    this.authService.logout()
    if (await this.authService.login(this.email, this.password)){
      this.router.navigate(['home'])
    }
  }

  public registerButtonClicked(): void {
    this.authService.register(this.email, this.password, this.nickname)
  }
}
