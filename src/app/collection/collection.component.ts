import {Component, OnInit} from '@angular/core';
import {NftInterface} from "../nft.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {NftService} from "../services/nft.service";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {GalleryInterface} from "../gallery.interface";
import {GalleryService} from "../services/gallery.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent  implements OnInit{

  nfts: NftInterface[]= [];
  gallerie: GalleryInterface[] = [];
  nftDetail: NftInterface | undefined;
  messageNft: string | undefined;
  messageGallery: string | undefined;

  public formGallery: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  })

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    pathImage: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(
      private serviceNft: NftService,
      private auth: AuthService,
      private userService: UserService,
      private serviceGallery: GalleryService

  ) {
  }

  checkIsLogged(): boolean {
    return this.auth.isLogged();

  }

  ngOnInit() {
    this.displayNftOfUserLoggin();
    this.getGallery();
  }

  getGallery(){
    this.serviceGallery.getAllGallery().subscribe(galleries => {
      this.gallerie = galleries;

    } )
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


  submitGallery(){
    if (this.formGallery.valid) {
      if (this.auth.isLogged()) {
        const token = this.auth.getToken();
        if (token !== null) {
          const gallery: GalleryInterface = {
            id:0,
            name: this.formGallery.value.name,
            description: this.formGallery.value.description,
            nft: []
          };
          this.serviceGallery.addGallery(gallery, token).subscribe(response => {

          });
        } else {
          console.log('User token is null');
        }
      } else {
        console.log('User not authenticated');
      }

      this.messageGallery = "Votre gallery à bien été créé";

    } else {
      console.log('Form is invalid');
    }
    this.formGallery.reset();
    this.getGallery();
    // this.form.reset();
  }
  onSubmit() {
    if (this.form.valid) {
      // window.location.reload();
      if (this.auth.isLogged()) {
        const token = this.auth.getToken();
        console.log(token);
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
      this.displayNftOfUserLoggin();
      this.messageNft = "Votre NFT à bien été créé";
      this.form.reset();
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } else {
      console.log('Form is invalid');
    }
  }

  delete(id: number, index: number) {
    this.serviceNft.deleteNft(id).subscribe(resultatDelete => {
      this.nfts.splice(index,1);

    });

  }

  pushToGallery(id: number, index: number) {
    this.serviceNft.getNftById(id).subscribe(nftResult => {
        this.gallerie[2].nft.push(nftResult);

    });
  }


  deleteGallery(id: number, index: number) {
    this.serviceGallery.deleteGallery(id).subscribe(resultatDelete => {
      this.gallerie.splice(index,1);


    });

  }




  displayNftOfUserLoggin() {
    if (this.auth.isLogged()) {
      let loggedInUsername = this.auth.getLoggedInUsername();

      if (loggedInUsername) {
        this.serviceNft.getAllNft().subscribe(
          (nfts: NftInterface[]) => {
            this.nfts = nfts.filter(nft => nft.user.username === loggedInUsername);
            this.nfts.forEach(nft => {
            });
          },
          (error) => {
            console.error('Erreur lors de la récupération des NFTs :', error);
          }
        );
      }
    }
  }



}
