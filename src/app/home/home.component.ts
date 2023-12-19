import {Component, OnInit} from '@angular/core';
import {NftInterface} from "../nft.interface";
import {NftService} from "../services/nft.service";
import {AuthService} from "../services/auth.service";
import {UserInterface} from "../user.interface";
import {UserService} from "../services/user.service";
import {FavorisService} from "../services/favoris.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  nfts: NftInterface[]= [];
  listUsers: UserInterface[]= [];
  carouselImages: string[] = [];
  threeRandomUser: any;
  randomImage: any ;
  randomImage1: any;
  randomImage2: any;

  isAdmin: boolean = false;

  userData: UserInterface | undefined;
  constructor(
    private serviceNft: NftService,
    private auth: AuthService,
    private userService: UserService,
    private favoris: FavorisService


  ) {
  }

  ngOnInit() {
    this.getNft();
    if (this.auth.isLogged()) {
      this.userService.onSubmit().subscribe(
        (userData) => {
          if (userData) {

            this.userData = userData;

          } else {

          }
        },
        (error) => {

        }
      );
    }

  }

  getNft(){
    this.serviceNft.getAllNft().subscribe(Nfts => {
      this.nfts = Nfts;
      this.setCarouselImages();
      this.setPopulaireImage();
    });
  }

  setPopulaireImage() {
    this.serviceNft.getAllNft().subscribe(nfts => {
      let randomIndex = Math.floor(Math.random() * nfts.length);
      this.randomImage = nfts[randomIndex];

       randomIndex = Math.floor(Math.random() * nfts.length);
      this.randomImage1 = nfts[randomIndex];

      randomIndex = Math.floor(Math.random() * nfts.length);
      this.randomImage2 = nfts[randomIndex];

    });
  }

  setCarouselImages() {

    let randomIndexes: any [] = [];
    while (randomIndexes.length < 3) {
      let randomIndex = Math.floor(Math.random() * this.nfts.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    this.carouselImages = randomIndexes.map(index => this.nfts[index].pathImage);

  }




  logout() {
    this.auth.clearToken();
  }

  checkIsLogged(): boolean {
    return this.auth.isLogged();
  }

    checkIsAdmin(): boolean {
        let checkRole = this.auth.getRole();
        this.isAdmin = checkRole === 'ROLE_ADMIN';
        return this.isAdmin;
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
