import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken } from './user.interface';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "https://danny-webdev.fr/api/login_check";
  constructor(private http: HttpClient) { }


  login(credentials:any): Observable<IToken>{
    return this.http.post<IToken>(this.url, credentials);

  }

}
