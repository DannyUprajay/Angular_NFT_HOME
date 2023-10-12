import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NftComponent } from './nft/nft.component';
import { EthComponent } from './eth/eth.component';
import { LoginComponent } from './login/login.component';
import { NftDetailComponent } from './nft-detail/nft-detail.component';
import { NftEditComponent } from './nft-edit/nft-edit.component';
import { FooterComponent } from './footer/footer.component';
import { CollectionComponent } from './collection/collection.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminNftComponent } from './admin-nft/admin-nft.component';
import { FavoriteComponent } from './favorite/favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    HeaderComponent,
    NftComponent,
    EthComponent,
    LoginComponent,
    NftDetailComponent,
    NftEditComponent,
    FooterComponent,
    CollectionComponent,
    UserEditComponent,
    AdminComponent,
    AdminUserComponent,
    AdminNftComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
