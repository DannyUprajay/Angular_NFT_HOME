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
        if (this.auth.isLogged()) {
            this.userService.onSubmit().subscribe(
                (userData) => {
                    if (userData) {

                        this.userData = userData;

                    } else {

                    }
                },
                (error) => {

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
        if(checkRole === 'ROLE_ADMIN'){
            this.isAdmin = true;
        }
        return this.isAdmin;
    }


}
