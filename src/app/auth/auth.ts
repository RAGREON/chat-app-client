import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {
  formData = { 
    username: '',
    password: ''
  }
  
  constructor(private http: HttpClient) {}

  onSubmit() {
    const url = "http://localhost:5062/api/Account"
    
    this.http.post(url, this.formData).subscribe({
      next: (response) => {
        console.log("success:", response)
      },
      error: (err) => {
        console.error("error:", err)
      }
    })
  }
}
