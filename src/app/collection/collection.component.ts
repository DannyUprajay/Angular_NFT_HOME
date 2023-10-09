import {Component, OnInit} from '@angular/core';
import {NftInterface} from "../nft.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {NftService} from "../services/nft.service";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent  implements OnInit{

  nfts: NftInterface[]= [];
  nftDetail: NftInterface | undefined;

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    pathImage: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(
      private serviceNft: NftService,
      private auth: AuthService,
      private userService: UserService

  ) {
  }

  checkIsLogged(): boolean {
    return this.auth.isLogged();

  }

  ngOnInit() {
    this.displayNftOfUserLoggin();
  }

  getNft(){
    this.serviceNft.getAllNft().subscribe(Nfts => {
      this.nfts = Nfts;
      console.log(this.nfts)
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


  onSubmit() {
    if (this.form.valid) {
      // window.location.reload();
      if (this.auth.isLogged()) {
        const token = this.auth.getToken();
        if (token !== null) {
          const nft: NftInterface = {
            id: 0,
            name: this.form.value.name,
            user: {
              username :'',
              profilPicture: ''
            },
            category:{
              label:''
            },
            pathImage: this.form.value.pathImage,
            price: this.form.value.price,
          };
          this.serviceNft.addNft(nft, token).subscribe(response => {

          });
        } else {
          console.log('User token is null');
        }
      } else {
        console.log('User not authenticated');
      }
      this.getNft();
      this.form.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  delete(id: number, index: number) {
    this.serviceNft.deleteNft(id).subscribe(resultatDelete => {
      this.nfts.splice(index,1);
      console.log(this.nfts);
    });

  }

  displayNftOfUserLoggin() {


    if (this.auth.isLogged()) {
      let loggedInUsername = this.auth.getLoggedInUsername();
      if (loggedInUsername) {
        this.serviceNft.getAllNft().subscribe(
            (nfts: NftInterface[]) => {
              this.nfts = nfts.filter(nft => nft.user.username === loggedInUsername);
              console.log('NFTs de l\'utilisateur connecté :', this.nfts);
            },
            (error) => {
              console.error('Erreur lors de la récupération des NFTs :', error);
            }
        );
      }
    }
  }




}
