import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private route:Router
  ) { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.route.navigate(['/']);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  clearToken() {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getLoggedInUsername(): string | null {
    let token = localStorage.getItem('token');
    if (token) {
      let tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        let payload = JSON.parse(atob(tokenParts[1]));
        let username = payload.username;
        return username;
      }
    }
    return null;
  }



}
