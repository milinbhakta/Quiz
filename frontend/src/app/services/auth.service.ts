import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessPointUrl = 'https://localhost:44399/api/questions';
  private quizUrl = 'https://localhost:44399/api/quizzes';
  private accountUrl = 'https://localhost:44399/api/account';

  username;

  constructor(private http: HttpClient, private router: Router) { }

  get isAuthenticated() {
    return !!window.localStorage.getItem('token');
  }

  register(credentials) {
    return this.http.post<any>(this.accountUrl, credentials).subscribe(res => {
      this.authenticate(res);
    });
  }

  login(credentials) {
    return this.http.post<any>(`${this.accountUrl}/login`, credentials).subscribe(res => {
      this.authenticate(res);
    });
  }

  authenticate(res) {
    console.log('token value is:' + res.value.username);
    this.username = res.value.username;
    window.localStorage.setItem('token', res.value.token);
    this.router.navigate(['/']);
  }

  logout() {
    window.localStorage.removeItem('token');
  }

}
