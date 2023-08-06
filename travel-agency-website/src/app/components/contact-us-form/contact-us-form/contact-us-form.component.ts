import { Component } from '@angular/core';


@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.css']
})

export class ContactUsFormComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  message: string = '';

  constructor() { }

  onSubmit() {
    console.log(this.name + this.surname + this.email + this.message);
  }
}
