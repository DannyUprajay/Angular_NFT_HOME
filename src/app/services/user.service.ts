import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {result, UserInterface} from "../user.interface";
import { map } from 'rxjs/operators';
import {AuthService} from "../auth.service";


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
    return this.http.get<UserInterface[] >("https://127.0.0.1:8000/user/");
  }

  getUserById(id: number): Observable<UserInterface>{
    return this.http.get<UserInterface>('https://127.0.0.1:8000/user/' + id);
  }

  addUser(user: UserInterface): Observable<result> {
    const body = JSON.stringify(user);
    const header = { 'content-type': 'application/x-www-form-urlencoded'};
    return this.http.post<result>("https://127.0.0.1:8000/user/new", body, {'headers': header})

  }

  deleteUser(id: number): Observable<result>{
    return this.http.delete<result>('https://127.0.0.1:8000/user/' + id);
  }

  getUserData(): Observable<UserInterface | undefined> {
    const loggedInUsername = this.auth.getLoggedInUsername();
    console.log('E-mail extrait du token :', loggedInUsername);
    return this.getAllUser().pipe(
      map((users: UserInterface[]) => {
        console.log('Tous les utilisateurs :', users);
        return users.find(user => user.username === loggedInUsername);
      })
    );
  }

    onSubmit() {
        this.getUserData().subscribe(
            (userData) => {
                if (userData) {
                    console.log('Données de l\'utilisateur connecté :', userData);
                    this.userData = userData;
                } else {
                    console.log('Aucun utilisateur trouvé.');
                }
            },
            (error) => {
                console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
            }
        );
    }


}
