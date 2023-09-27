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
      if (this.authService.isLogged()) {
        const token = this.authService.getToken();
        if (token !== null) {
          const nft: NftInterface = {
            id: 0,
            name: this.form.value.name,
            user: {
              username :''
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



}
