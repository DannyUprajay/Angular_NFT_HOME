import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {NftService} from "../services/nft.service";
import {NftInterface} from "../nft.interface";

@Component({
  selector: 'app-admin-nft',
  templateUrl: './admin-nft.component.html',
  styleUrls: ['./admin-nft.component.css']
})
export class AdminNftComponent {

    nfts: NftInterface[]= [];
  constructor(
    private auth: AuthService,
    private serviceNft: NftService
              ) {
  }

  logout() {
    this.auth.clearToken();
  }

  checkIsLogged(): boolean {
    return this.auth.isLogged();
  }

    ngOnInit() {
        this.getNft();

    }

    getNft(){
        this.serviceNft.getAllNft().subscribe(Nfts => {
            this.nfts = Nfts;
        });
    }

    delete(id: number, index: number) {
        this.serviceNft.deleteNft(id).subscribe(resultatDelete => {
            this.nfts.splice(index,1);
            console.log(this.nfts);
        });

    }

}

