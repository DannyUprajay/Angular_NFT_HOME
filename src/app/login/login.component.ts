import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login.service";
import {FormControl, FormGroup} from "@angular/forms";
import {IToken} from "../user.interface";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private service: LoginService,
    private auth: AuthService
  ) {
  }
  ngOnInit() {

  }

  public form:FormGroup = new FormGroup({
    username: new FormControl("vegeta@gmail.com"),
    password: new FormControl("toto123")
  })

  handleSubmit(){
    // console.log(this.form.value);
    this.service.login(this.form.value).subscribe(
      (data:IToken)=>{
        // console.log(data.token);
        this.auth.saveToken(data.token)
      },
      err => console.log(err),

    )

  }

}
