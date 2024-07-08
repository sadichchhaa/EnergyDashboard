import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8090/api/auth';
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password }).subscribe(response => {
      // console.log(response.user.username);
      sessionStorage.setItem('userid', JSON.stringify(response.user.userId));
      sessionStorage.setItem('username', JSON.stringify(response.user.username));
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
    },
      error => {
        console.error(error);
      });
  }

  signup(email:string, username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/signup`, { email, username, password }).subscribe(response => {
      sessionStorage.setItem('userid', JSON.stringify(response.user.userId));
      sessionStorage.setItem('username', JSON.stringify(response.user.username));
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
    },
      error => {
        console.error(error);
      });
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }
}