import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.css']
})

export class ContactUsFormComponent {
  public name: string = '';
  public surname: string = '';
  public email: string = '';
  public message: string = '';

  constructor() { }

  public onSubmit(e: Event): void {
    e.preventDefault();

    emailjs.sendForm('travel-agency-website', 'template_7c8tdt7', e.target as HTMLFormElement, 'wL8YyNQC9vEfsNiD2')
      .then((result: EmailJSResponseStatus) => {
        alert('Your message has been sent!');
      }, (error) => {
        console.log(error.text);
      });
  }
}
