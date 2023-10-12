import {Component, OnInit} from '@angular/core';
import {NftService} from "../services/nft.service";
import {NftInterface} from "../nft.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {UserInterface} from "../user.interface";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {FavorisService} from "../services/favoris.service";

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit{

  nfts: NftInterface[]= [];
  nftDetail: NftInterface | undefined;
  favList: NftInterface[] = [];

  constructor(
    private serviceNft: NftService,
    private auth: AuthService,
    private userService: UserService,
    private favoris: FavorisService

  ) {
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

  viewOneNft(id:number){
    this.serviceNft.getNftById(id).subscribe(nftResult => {
      this.nftDetail = nftResult;
      console.log(this.nftDetail);
    })
  }

  likesState: { [key: number]: boolean } = {};

  toggleLike(nftId: number) {

    if (!this.likesState[nftId]) {
      this.likesState[nftId] = true;
    } else {
      this.likesState[nftId] = false;

    }
  }

  delete(id: number, index: number) {
    this.serviceNft.deleteNft(id).subscribe(resultatDelete => {
      this.nfts.splice(index,1);
      console.log(this.nfts);
    });

  }


  addFav(id: number){
    this.serviceNft.getNftById(id).subscribe( nft =>{
      let add = this.favoris.addToFavorites(nft)
      if(add){
        this.favoris.addToFavorites(nft);
        alert('Nft envoyé dans votre liste fovoris')
      }else{
        alert("Nft déjà dans votre liste favoris")
      }
    })
  }




}
