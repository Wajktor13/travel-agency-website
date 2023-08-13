import { Component, HostListener} from '@angular/core';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    public authService: AuthService
    ) { }

  @HostListener('window:unload', ['$event'])
  unloadHandler(_: any) {
    if (localStorage.getItem("keepLoggedIn") != "true"){
      this.authService.logout()
      localStorage.clear()
    }
  }
}
