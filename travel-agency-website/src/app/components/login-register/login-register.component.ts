import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {
  public radioLoginChecked: boolean = true
  public popupHidden: boolean = true
  public passwordVisible = false
  public nickname: string = ''
  public email: string = ''
  public password: string = ''
  public repeatedPassword: string = ''

  public minCharsRequirement: PasswordRequirement = new PasswordRequirement(8, false, 'min-chars-requirement-img')
  public minSpecialCharsRequirement: PasswordRequirement = new PasswordRequirement(1, false, 'min-special-chars-requirement-img')
  public minDigitsRequirement: PasswordRequirement = new PasswordRequirement(1, false, 'min-digits-requirement-img')
  public minUppercaseCharsRequirement: PasswordRequirement = new PasswordRequirement(1, false, 'min-uppercase-chars-requirement-img')

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
    if (this.password !== this.repeatedPassword) {
      alert('passwords are not the same')
      return
    } else if (this.minCharsRequirement.status === false || this.minSpecialCharsRequirement.status === false || this.minDigitsRequirement.status === false || this.minUppercaseCharsRequirement.status === false) {
      alert('password does not meet requirements')
      return
    }
    
    this.authService.register(this.email, this.password, this.nickname)
  }

  public togglePopup(): void {
    this.popupHidden = !this.popupHidden
  }

  public async loginWithTestAccount(email: string, password: string): Promise<void> {
    this.authService.logout()
    if (await this.authService.login(email, password)){
      this.router.navigate(['home'])
    }
  }

  public togglePasswordVisibility(event: Event, inputID: string): void {
    let visibilityToggleImg: HTMLImageElement = event.target as HTMLImageElement
    let input: HTMLInputElement = document.getElementById(inputID) as HTMLInputElement
      if(input.type === 'password') {
        input.type = 'text'
        visibilityToggleImg.src = '../../../assets/images/hide_password_icon.png'
      } else {
        input.type = 'password'
        visibilityToggleImg.src = '../../../assets/images/show_password_icon.png'
      }
  }

  public checkPasswordRequirements(event: Event): void {
    let password: string = (event.target as HTMLInputElement).value

    this.minCharsRequirement.status = password.length >= this.minCharsRequirement.required
    if (this.minCharsRequirement.status) {
      document.getElementById(this.minCharsRequirement.statusImgElementID)?.setAttribute('src', '../../../assets/images/requirement_fulfilled_icon.png')
    } else {
      document.getElementById(this.minCharsRequirement.statusImgElementID)?.setAttribute('src', '../../../assets/images/requirement_not_fulfilled_icon.png')
    }

    this.minSpecialCharsRequirement.status = password.match(/[^a-zA-Z0-9]/g)!?.length >= this.minSpecialCharsRequirement.required
    if (this.minSpecialCharsRequirement.status) {
      document.getElementById(this.minSpecialCharsRequirement.statusImgElementID)?.setAttribute('src', '../../../assets/images/requirement_fulfilled_icon.png')
    } else {
      document.getElementById(this.minSpecialCharsRequirement.statusImgElementID)?.setAttribute('src', '../../../assets/images/requirement_not_fulfilled_icon.png')
    }

    this.minDigitsRequirement.status = password.match(/[0-9]/g)!?.length >= this.minDigitsRequirement.required
    if (this.minDigitsRequirement.status) {
      document.getElementById(this.minDigitsRequirement.statusImgElementID)?.setAttribute('src', '../../../assets/images/requirement_fulfilled_icon.png')
    } else {
      document.getElementById(this.minDigitsRequirement.statusImgElementID)?.setAttribute('src', '../../../assets/images/requirement_not_fulfilled_icon.png')
    }

    this.minUppercaseCharsRequirement.status = password.match(/[A-Z]/g)!?.length >= this.minUppercaseCharsRequirement.required
    if (this.minUppercaseCharsRequirement.status) {
      document.getElementById(this.minUppercaseCharsRequirement.statusImgElementID)?.setAttribute('src', '../../../assets/images/requirement_fulfilled_icon.png')
    } else {
      document.getElementById(this.minUppercaseCharsRequirement.statusImgElementID)?.setAttribute('src', '../../../assets/images/requirement_not_fulfilled_icon.png')
    }
  }
}

class PasswordRequirement {
  public required: number
  public status: boolean
  public statusImgElementID: string

  constructor(required: number, status: boolean, statusImgElementID: string) {
    this.required = required
    this.status = status
    this.statusImgElementID = statusImgElementID
  }
}
