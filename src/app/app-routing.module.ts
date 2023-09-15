import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserComponent} from "./user/user.component";
import {HomeComponent} from "./home/home.component";
import {EthComponent} from "./eth/eth.component";
import {NftComponent} from "./nft/nft.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'nft', component: NftComponent},
  {path: 'eth', component: EthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
