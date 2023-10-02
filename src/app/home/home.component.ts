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
    });
  }

  // getUser(){
  //   this.service.getAllUser().subscribe(Users => {
  //     this.listUsers = Users;
  //   });
  // }


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
