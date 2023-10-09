import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {UserInterface} from "../user.interface";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    role: any;
    isLogin: boolean = false;
    user: any;
    userData: UserInterface | undefined;
    isAdmin: boolean = false;

    constructor(
      private auth: AuthService,
      private userService: UserService
      ) {}

    ngOnInit() {
        this.role = this.auth.getRole();
        console.log(this.role);
        if (this.auth.isLogged()) {
            this.userService.onSubmit().subscribe(
                (userData) => {
                    if (userData) {
                        console.log('Données de l\'utilisateur connecté :', userData);
                        this.userData = userData;
                        console.log(this.userData.username);
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

    checkIsAdmin(): boolean {
        let checkRole = this.auth.getRole();
        this.isAdmin = checkRole === 'ROLE_ADMIN';
        return this.isAdmin;
    }

}
