import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, AuthToken, LoginDto } from '../service/auth';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  formData = {
    email: '',
    password: '',
  };

  token = '';

  constructor(private auth: Auth) {}

  onLogin() {
    const dto: LoginDto = {
      email: this.formData.email,
      password: this.formData.password,
    };

    this.auth.login(dto).subscribe({
      next: (res: AuthToken) => {
        this.token = res.token;
        console.log(this.token);
        console.log(jwtDecode(this.token));
        sessionStorage.setItem('token', this.token);
      },
      error: (err) => {
        console.log('error logging in:', err);
      },
    });
  }
}
