import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login.service";
import {FormControl, FormGroup} from "@angular/forms";
import {IToken, UserInterface} from "../user.interface";
import {AuthService} from "../auth.service";
import {UserService} from "../services/user.service";
import {DatePipe} from "@angular/common";

declare function login(): any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userData: any;
    isLoginFormActive: boolean = true;

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
      const formattedBirth = this.datePipe.transform(this.formRegister.value.birth, 'dd/MM/yyyy');

      const user: UserInterface = {
        id: 0,
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
        password: this.formRegister.value.password,
        birth: formattedBirth
      };

      this.serviceUser.addUser(user).subscribe(response => {
        // this.getUser();
          window.location.reload()
        this.formRegister.reset(); // Réinitialisez le formulaire d'inscription
        console.log(user);
      });
    } else {
      console.log('Formulaire invalide');
    }

  }


    // onSubmit() {
    //     this.serviceUser.getUserData().subscribe(
    //         (userData) => {
    //             if (userData) {
    //                 console.log('Données de l\'utilisateur connecté :', userData);
    //                 this.userData = userData;
    //             } else {
    //                 console.log('Aucun utilisateur trouvé.');
    //             }
    //         },
    //         (error) => {
    //             console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
    //         }
    //     );
    // }



}
