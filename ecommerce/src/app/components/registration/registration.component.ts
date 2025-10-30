import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  passVisibilityState: boolean = false;
  inputType: string = 'password';

  toggleInputType(): void {
    this.passVisibilityState = !this.passVisibilityState
    this.inputType = this.passVisibilityState ? 'text' : 'password';
  }

  protected readonly RouterLink = RouterLink;
}
