import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UserInterface} from "../user.interface";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: UserInterface | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) {
  }

  public editUser: FormGroup = new FormGroup({
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    profilPicture: new FormControl(''),
  });

  ngOnInit() {

    this.route.params.subscribe(params => {
      let nftId = +params['id'];
      this.getUserId(nftId);
    });


    this.userService.getUserById(this.route.snapshot.params['id']).subscribe((result) => {
      console.log(result);
      this.editUser = new FormGroup({
        username: new FormControl(result['username']),
        firstName: new FormControl(result['firstName']),
        lastName: new FormControl(result['lastName']),
        profilPicture: new FormControl(result['profilPicture']),
      })

      // this.auth.clearToken();
      this.auth.getToken()
      this.userService.getUserData();

    });
  }

  update() {
    this.userService.updateUser(this.route.snapshot.params['id'], this.editUser.value).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/user/' + this.route.snapshot.params['id']]);
    })
  }

  getUserId(id: number) {
    this.userService.getUserById(id).subscribe(nftResult => {
      this.user = nftResult;
      // console.log(this.nft);
    });
  }



}
