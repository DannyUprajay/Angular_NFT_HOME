import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {UserInterface} from "../user.interface";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLogin: boolean = false;
    user: any;
    userData: UserInterface | undefined;

    constructor(
      private auth: AuthService,
      private userService: UserService
      ) {}

    ngOnInit() {
        if (this.auth.isLogged()) {
            this.userService.onSubmit().subscribe(
                (userData) => {
                    if (userData) {
                        console.log('Données de l\'utilisateur connecté :', userData);
                        this.userData = userData;
                        console.log(this.userData.profilPicture);
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

    logout() {
        this.auth.clearToken();
    }

    checkIsLogged(): boolean {
        return this.auth.isLogged();
    }

}
