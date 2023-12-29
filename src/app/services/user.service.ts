import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, Observable} from "rxjs";
import {result, UserInterface} from "../user.interface";
import { map } from 'rxjs/operators';
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

    userData: any;
  constructor(
    private http: HttpClient,
    private auth: AuthService
              )
  { }


  getAllUser(): Observable<UserInterface[]>{
    return this.http.get<UserInterface[] >("https://danny-webdev.fr/user/");
  }

  getUserById(id: number): Observable<UserInterface>{
    return this.http.get<UserInterface>('https://danny-webdev.fr/user/' + id);
  }

  addUser(user: UserInterface): Observable<result> {
    let body = JSON.stringify(user);
    let header = { 'content-type': 'application/x-www-form-urlencoded'};
    return this.http.post<result>("https://danny-webdev.fr/user/new", body, {'headers': header})

  }

  deleteUser(id: number): Observable<result>{
    return this.http.delete<result>('https://danny-webdev.fr/user/' + id);
  }

  getUserData(): Observable<UserInterface | undefined> {
    let loggedInUsername = this.auth.getLoggedInUsername();
    return this.getAllUser().pipe(
      map((users: UserInterface[]) => {
        return users.find(user => user.username === loggedInUsername);
      })
    );
  }

    onSubmit() {
        return this.getUserData().pipe(
            catchError((error) => {

                return EMPTY;
            })
        );
    }

  updateUser(id :number, data :any){
    let body = JSON.stringify(data);
    let header = { 'content-type': 'application/x-www-form-urlencoded'};
    return this.http.post<result>(`https://danny-webdev.fr/user/${id}/edit`, body,  {'headers': header});
  }

}
