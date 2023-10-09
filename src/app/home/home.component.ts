import {Component, OnInit} from '@angular/core';
import {NftInterface} from "../nft.interface";
import {NftService} from "../services/nft.service";
import {AuthService} from "../auth.service";
import {UserInterface} from "../user.interface";
import {UserService} from "../services/user.service";

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

  userData: UserInterface | undefined;
  constructor(
    private serviceNft: NftService,
    private auth: AuthService,
    private userService: UserService,


  ) {
  }

  ngOnInit() {
    this.getNft();
    if (this.auth.isLogged()) {
      this.userService.onSubmit().subscribe(
        (userData) => {
          if (userData) {
            console.log('Données de l\'utilisateur connecté :', userData);
            this.userData = userData;
            console.log(this.userData.profilPicture);
          } else {
            console.log('Aucun utilisateur trouvé.');
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
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

  // getUser(){
  //   this.service.getAllUser().subscribe(Users => {
  //     this.listUsers = Users;
  //   });
  // }

  setPopulaireImage() {
    this.serviceNft.getAllNft().subscribe(nfts => {
      let randomIndex = Math.floor(Math.random() * nfts.length);
      this.randomImage = nfts[randomIndex];
      console.log(this.randomImage.user.username + 'salut');
       randomIndex = Math.floor(Math.random() * nfts.length);
      this.randomImage1 = nfts[randomIndex];
      console.log(this.randomImage1.user.username + 'salut');
      randomIndex = Math.floor(Math.random() * nfts.length);
      this.randomImage2 = nfts[randomIndex];
      console.log(this.randomImage2.user.username + 'salut');
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
    console.log(this.carouselImages)
  }

  setThreeRandomUser() {
    let randomUser: any;
    while (randomUser.length < 3) {
      let randomIndex = Math.floor(Math.random() * this.nfts.length);
      if (!randomUser.includes(randomIndex)) {
        randomUser.push(randomIndex);
      }
    }

    // this.threeRandomUser = randomUser.map(index => this.nfts[index].pathImage);
    // console.log(this.threeRandomUser)
  }


  likesState: { [key: number]: boolean } = {};

  toggleLike(nftId: number) {

    if (!this.likesState[nftId]) {
      this.likesState[nftId] = true;
    } else {
      this.likesState[nftId] = false;

    }
  }



  logout() {
    this.auth.clearToken();
  }

  checkIsLogged(): boolean {
    return this.auth.isLogged();
  }
}
