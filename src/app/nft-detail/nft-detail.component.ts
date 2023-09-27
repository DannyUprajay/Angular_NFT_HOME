import {Component, OnInit} from '@angular/core';
import {NftInterface} from "../nft.interface";
import {NftService} from "../services/nft.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {NftComponent} from "../nft/nft.component";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.css']
})
export class NftDetailComponent implements OnInit{

    nft: NftInterface | undefined;

  constructor(
    private nftService: NftService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    pathImage: new FormControl(''),
    price: new FormControl(''),
  });
    ngOnInit() {
        this.route.params.subscribe(params => {
            const nftId = +params['id'];
            this.getNftId(nftId);
        });
    }

    getNftId(id: number) {
        this.nftService.getNftById(id).subscribe(nftResult => {
            this.nft = nftResult;
            // console.log(this.nft);
        });
    }

    // editNft(){
    //
    //   console.log(this.nft?.price + "salut");
    // }

  editNft() {
    if (this.form.valid) {
      let name = this.form.value.name;
      let pathImage = this.form.value.pathImage;
      let price = this.form.value.price;

      // Update the nft object properties
      if (this.nft) {
        this.nft.name = name;
        this.nft.pathImage = pathImage;
        this.nft.price = price;
      }

      // Log the updated nft properties
      console.log('Updated NFT Name:', this.nft?.name);
      console.log('Updated NFT Path Image:', this.nft?.pathImage);
      console.log('Updated NFT Price:', this.nft?.price);
    }
  }

}
