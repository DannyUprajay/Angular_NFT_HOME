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

  user: UserInterface | undefined;

  constructor(
    private auth: AuthService,
    private userService: UserService
    ) {
  }

  ngOnInit() {


  }

  logout(){
    this.auth.clearToken();
  }


    checkIsLogged(): boolean {
        return this.auth.isLogged();

    }



}
