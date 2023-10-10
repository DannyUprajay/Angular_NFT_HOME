import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {UserInterface} from "../user.interface";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit{

  listUsers: UserInterface[] | undefined = [];
  constructor(
    private auth: AuthService,
    private user: UserService
  ) {}

  ngOnInit() {
    this.getAllUser();
    this.getOneUSer(9);

  }

  logout() {
    this.auth.clearToken();
  }

  checkIsLogged(): boolean {
    return this.auth.isLogged();
  }

  getOneUSer(id:number){
    this.user.getUserById(id).subscribe(user =>{
      console.log(user);
      console.log(user.roles);
    })
  }
  getAllUser(){
    this.user.getAllUser().subscribe(Users => {
      this.listUsers = Users;
      console.log(Users)

    });
  }


}
