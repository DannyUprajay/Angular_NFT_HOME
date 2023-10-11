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
          console.log('Données de l\'utilisateur connecté :', userData);
          this.userData = userData;
          console.log(this.userData.id);
        } else {
          console.log('Aucun utilisateur trouvé.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
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


  // onSubmit() {
  //   // window.location.reload();
  //   if (this.form.valid) {
  //     // window.location.reload();
  //     const formattedBirth = this.datePipe.transform(this.form.value.birth, 'dd/MM/yyyy');
  //
  //     const user: UserInterface = {
  //       id: 0,
  //       firstName: this.form.value.firstName,
  //       lastName: this.form.value.lastName,
  //       email: this.form.value.email,
  //       gender: this.form.value.gender,
  //       username: this.form.value.username,
  //       profilPicture: this.form.value.profilPicture,
  //       adress: {
  //         label: this.form.value.label,
  //         contry: this.form.value.contry,
  //         postalCode: this.form.value.postalCode
  //       },
  //       password: this.form.value.password,
  //       birth: formattedBirth
  //     };
  //
  //     this.service.addUser(user).subscribe(response => {
  //       this.getUser();
  //       this.form.reset();
  //       console.log(user);
  //     });
  //   } else {
  //     console.log('Formulaire invalide');
  //   }
  // }


  delete(id: number | undefined) {
    if (id) {
      this.userService.deleteUser(id).subscribe(resultatDelete => {
        console.log('Utilisateur supprimé avec succès.');
      });
    }
  }

  checkIsLogged(): boolean {
    return this.auth.isLogged();
  }

}
