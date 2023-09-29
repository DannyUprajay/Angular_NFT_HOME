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
    // this.route.navigate(['/']);
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
    const token = localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const username = payload.username; // Utilisez 'username' car c'est le champ dans votre payload
        return username;
      }
    }
    return null;
  }



}
