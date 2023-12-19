import { Component } from '@angular/core';
import {UserInterface} from "../user.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userData: UserInterface | undefined;

  listUsers: UserInterface[] = [];
  userDetail: UserInterface | undefined;

  public form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    adress: new FormControl(''),
    label: new FormControl(''),
    postalCode: new FormControl(''),
    contry: new FormControl(''),
    birth: new FormControl(''),
    username: new FormControl(''),
    profilPicture: new FormControl('')
  });
  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private auth: AuthService

  ) {
  }
  ngOnInit() {
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

  logout() {
    this.auth.clearToken();
  }
  getUser(){
    this.userService.getAllUser().subscribe(Users => {
      this.listUsers = Users;
    });
  }
  viewOneUser(id: number | undefined) {
    if (id !== undefined) {
      this.userService.getUserById(id).subscribe(userResult => {
        this.userDetail = userResult;
      });
    }
  }




  delete(id: number | undefined) {
    if (id) {
      this.userService.deleteUser(id).subscribe(resultatDelete => {

      });
    }
  }

  checkIsLogged(): boolean {
    return this.auth.isLogged();
  }

}
