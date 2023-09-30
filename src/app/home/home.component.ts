import {Component, OnInit} from '@angular/core';
import {NftInterface} from "../nft.interface";
import {NftService} from "../services/nft.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  nfts: NftInterface[]= [];

  constructor(
    private serviceNft: NftService,
    private authService: AuthService,

  ) {
  }

  ngOnInit() {
    this.getNft();

  }

  getNft(){
    this.serviceNft.getAllNft().subscribe(Nfts => {
      this.nfts = Nfts;
    });
  }

  checkIsLogged(): boolean {
    return this.authService.isLogged();

  }

  likesState: { [key: number]: boolean } = {};

  toggleLike(nftId: number) {

    if (!this.likesState[nftId]) {
      this.likesState[nftId] = true;
    } else {
      this.likesState[nftId] = false;

    }
  }

}
