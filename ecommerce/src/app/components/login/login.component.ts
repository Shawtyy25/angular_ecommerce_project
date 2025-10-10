import {Component, input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {InputErrorDirective} from '../../directives/input-error.directive';


@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    NgClass,
    FormsModule,
    InputErrorDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  passVisibilityState: boolean =  false;
  inputType: string = 'password';

  username: string = '';
  password: string = '';

  isInputValid: boolean = true;


  toggleInputType(): void {
    this.passVisibilityState = !this.passVisibilityState;
    this.inputType = this.passVisibilityState ? 'text' : 'password';
  }

  loginUser(): void {
    if (this.username.trim() && this.password.trim()) {
      this.authService.loginCheck(this.username.trim(), this.password.trim()).subscribe({

        next: (response) => {
          console.log(response);
          if (response.length > 1) {
            this.isInputValid = true;

            this.authService.setUser([response[1].user.name, response[1].user.admin]);

            if (this.authService.isAdmin2()) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/main']);
            }


          } else {
            console.error('Not found');
            this.isInputValid = false;
          }

        },
        error: (err) => {
          console.error(err);
          this.isInputValid = false;
        }

      })

    } else {
      alert('Fill all the gaps!');
      this.isInputValid = false;
    }

    this.username = '';
    this.password = '';
  }

  onInputChange(): void {
    this.isInputValid = true;
  }
}
