import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserComponent} from "./user/user.component";
import {HomeComponent} from "./home/home.component";
import {EthComponent} from "./eth/eth.component";
import {NftComponent} from "./nft/nft.component";
import {LoginComponent} from "./login/login.component";
import {NftDetailComponent} from "./nft-detail/nft-detail.component";
import {NftEditComponent} from "./nft-edit/nft-edit.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'nft', component: NftComponent},
  {path: 'eth', component: EthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'nft/:id', component: NftDetailComponent},
  {path: 'nft/:id/edit/:id', component: NftEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
