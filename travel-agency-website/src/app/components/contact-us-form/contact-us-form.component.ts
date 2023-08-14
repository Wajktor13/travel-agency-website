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
    e.preventDefault()

    if (!this.validateForm()) { 
      return
    }

    emailjs.sendForm('travel-agency-website', 'template_7c8tdt7', e.target as HTMLFormElement, 'wL8YyNQC9vEfsNiD2')
      .then((_: EmailJSResponseStatus) => {
        alert('Your message has been sent!')
      }, (error) => {
        console.log(error.text)
      });
  }

  private validateForm(): boolean {
    return this.validateNameSurname(this.name) && this.validateNameSurname(this.surname) && this.validateEmail(this.email) && this.validateMessage(this.message)
  }

  private validateNameSurname(str: string): boolean {
    if(/^[a-zA-Z]+$/.test(str) && str.length > 0){
      return true
    } else {
      alert('name and surname must contain only letters and cannot be empty')
      return false
    }
  }

  private validateEmail(email: string): boolean {
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      return true
    } else {
      alert('invalid email')
      return false
    }
  }

  private validateMessage(message: string): boolean {
    if(message.length > 0){
      return true
    } else {
      alert('message cannot be empty');
      return false
    }
  }
}