import {Component, OnInit} from '@angular/core';
import {NftService} from "../services/nft.service";
import {NftInterface} from "../nft.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {UserInterface} from "../user.interface";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit{

  nfts: NftInterface[]= [];
  nftDetail: NftInterface | undefined;

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    pathImage: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(private serviceNft: NftService, private authService: AuthService) {
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

  // ...

  toggleLike(nftId: number) {
    // Utilisez l'ID du NFT pour identifier le NFT concerné
    if (!this.likesState[nftId]) {
      this.likesState[nftId] = true;
      // Vous pouvez ajouter ici la logique pour envoyer une requête à votre API pour ajouter un like
    } else {
      this.likesState[nftId] = false;
      // Vous pouvez ajouter ici la logique pour envoyer une requête à votre API pour retirer un like
    }
  }


  onSubmit() {
    if (this.form.valid) {
      // Check if the user is logged in
      if (this.authService.isLogged()) {
        // Get the user's token
        const token = this.authService.getToken();

        // Check if the token is not null before calling addNft
        if (token !== null) {
          const nft: NftInterface = {
            id: 0,
            name: this.form.value.name,
            pathImage: this.form.value.pathImage,
            price: this.form.value.price,
          };

          // Pass the token to addNft method
          this.serviceNft.addNft(nft, token).subscribe(response => {
            this.getNft();
            this.form.reset();
          });
        } else {
          console.log('User token is null');
        }
      } else {
        console.log('User not authenticated');
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
