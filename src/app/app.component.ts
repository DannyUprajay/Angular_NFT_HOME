import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularNft';


  constructor(private router: Router) { }

  shouldShowHeader(): boolean {
    let currentUrl = this.router.url;
    return currentUrl !== '/' && currentUrl !== '/admin' && currentUrl !== '/admin/user' && currentUrl !== '/admin/nft';
  }
  shouldShowFooter(): boolean {
    let currentUrl = this.router.url;
    return currentUrl !== '/admin' && currentUrl !== '/admin/user' && currentUrl !== '/admin/nft';
  }
}
