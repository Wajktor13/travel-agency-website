import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


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

  onSubmit(e: Event) {
    e.preventDefault();

    emailjs.sendForm('travel-agency-website', 'template_7c8tdt7', e.target as HTMLFormElement, 'wL8YyNQC9vEfsNiD2')
      .then((result: EmailJSResponseStatus) => {
        alert('Your message has been sent!');
      }, (error) => {
        console.log(error.text);
      });
  }
}
