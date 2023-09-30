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
  carouselImages: string[] = [];
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
      this.setCarouselImages();
    });
  }


  setCarouselImages() {
    // Générer 3 index aléatoires
    let randomIndexes: any [] = [];
    while (randomIndexes.length < 3) {
      let randomIndex = Math.floor(Math.random() * this.nfts.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    // Récupérer les chemins d'image pour les index aléatoires
    this.carouselImages = randomIndexes.map(index => this.nfts[index].pathImage);
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
