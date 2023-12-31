import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserComponent} from "./user/user.component";
import {HomeComponent} from "./home/home.component";
import {EthComponent} from "./eth/eth.component";
import {NftComponent} from "./nft/nft.component";
import {LoginComponent} from "./login/login.component";
import {NftDetailComponent} from "./nft-detail/nft-detail.component";
import {NftEditComponent} from "./nft-edit/nft-edit.component";
import {CollectionComponent} from "./collection/collection.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {AdminComponent} from "./admin/admin.component";
import {authGuard} from "./auth.guard";
import {AdminUserComponent} from "./admin-user/admin-user.component";
import {AdminNftComponent} from "./admin-nft/admin-nft.component";
import {FavoriteComponent} from "./favorite/favorite.component";
import {CollectionDetailComponent} from "./collection-detail/collection-detail.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/:id', component: UserEditComponent},
  {path: 'nft', component: NftComponent},
  {path: 'eth', component: EthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'nft/:id', component: NftDetailComponent},
  {path: 'nft/:id/edit/:id', component: NftEditComponent},
  {path: 'gallery', component: CollectionComponent},
  {path: 'gallery/:id', component: CollectionDetailComponent},
  {path: 'admin', canActivate:[authGuard], component: AdminComponent  },
  {path: 'admin/user', component: AdminUserComponent, canActivate:[authGuard] },
  {path: 'admin/nft', component: AdminNftComponent, canActivate:[authGuard] },
  {path: 'favoris', component: FavoriteComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
