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

}
