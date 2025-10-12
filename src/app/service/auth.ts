import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ChatService } from '../chat-service';

export interface AuthResponse {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface AuthToken {
  token: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:5062/api/auth';

  constructor(private http: HttpClient, private chatService: ChatService) {}

  login(dto: LoginDto): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.apiUrl}/login`, dto).pipe(
      tap((res) => {
        localStorage.setItem('auth-token', res.token);
        this.chatService.startConnection(res.token);
      })
    );
  }

  register(dto: RegisterDto) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      email: dto.email,
      username: dto.username,
      password: dto.password,
    });
  }
}
