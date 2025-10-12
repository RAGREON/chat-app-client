import { Component } from '@angular/core';
import { Auth, AuthResponse, RegisterDto } from '../service/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  registerFormData = {
    email: '',
    username: '',
    password: '',
  };

  constructor(private auth: Auth) {}

  onRegister() {
    const dto: RegisterDto = {
      email: this.registerFormData.email,
      username: this.registerFormData.username,
      password: this.registerFormData.password,
    };

    this.auth.register(dto).subscribe({
      next: (res: AuthResponse) => {
        alert('registered user successfully');
        console.log(res);
      },
      error: (err) => {
        console.log('error logging in:', err);
      },
    });
  }
}