import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-admin-nft',
  templateUrl: './admin-nft.component.html',
  styleUrls: ['./admin-nft.component.css']
})
export class AdminNftComponent {

  constructor(private auth: AuthService) {
  }

  logout() {
    this.auth.clearToken();
  }

  checkIsLogged(): boolean {
    return this.auth.isLogged();
  }
}
