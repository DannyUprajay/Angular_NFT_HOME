import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login.service";
import {FormControl, FormGroup} from "@angular/forms";
import {IToken, UserInterface} from "../user.interface";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {DatePipe} from "@angular/common";
import * as bcrypt from 'bcryptjs';

declare function login(): any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userData: any;
    isLoginFormActive: boolean = true;
    message: string | undefined;

  constructor(
    private service: LoginService,
    private auth: AuthService,
    private serviceUser: UserService,
    private datePipe: DatePipe
  ) {
  }
  ngOnInit() {
    this.serviceUser.onSubmit()
  login();
  }

  public formLogin:FormGroup = new FormGroup({
    username: new FormControl("vegeta@gmail.com"),
    password: new FormControl("toto123")
  })

  public formRegister: FormGroup = new FormGroup({
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

    handleSubmit() {
        this.service.login(this.formLogin.value).subscribe(
            (data: IToken) => {
                this.auth.saveToken(data.token);
                console.log(data);
                this.serviceUser.onSubmit().subscribe(
                    () => {
                        console.log('Utilisateur connecté avec succès');
                        window.location.reload();
                    },
                    (error) => {
                        console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
                    }
                );
            },
            (err) => {
                console.log(err);
            }
        );
    }


  register() {
    if (this.formRegister.valid) {
      let formattedBirth = this.datePipe.transform(this.formRegister.value.birth, 'dd/MM/yyyy');
      let saltRounds = 10;
      let hashedPassword = bcrypt.hashSync(this.formRegister.value.password, saltRounds);
      let user: UserInterface = {
        id: 0,
        roles:[],
        firstName: this.formRegister.value.firstName,
        lastName: this.formRegister.value.lastName,
        email: this.formRegister.value.email,
        gender: this.formRegister.value.gender,
        username: this.formRegister.value.username,
        profilPicture: this.formRegister.value.profilPicture,
        adress: {
          label: this.formRegister.value.label,
          contry: this.formRegister.value.contry,
          postalCode: this.formRegister.value.postalCode
        },
        password: hashedPassword,
        birth: formattedBirth
      };

      this.serviceUser.addUser(user).subscribe(response => {
          window.location.reload()
        this.formRegister.reset();

        console.log(user);
      });
      this.formRegister.reset();
      this.message = "Votre compte à bien été créé";
    } else {
      console.log('Formulaire invalide');
      this.message = "veuillez remplir tous les champs";
    }

  }

}
