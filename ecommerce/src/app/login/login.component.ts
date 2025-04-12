import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passVisibilityState: boolean =  false;
  inputType: string = 'password';


  toggleInputType(): void {
    this.passVisibilityState = !this.passVisibilityState;
    this.inputType = this.passVisibilityState ? 'text' : 'password';
  }
}
