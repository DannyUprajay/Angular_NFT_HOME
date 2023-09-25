import {Component, OnInit} from '@angular/core';
import {NftService} from "../services/nft.service";
import {NftInterface} from "../nft.interface";

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit{

  nfts: NftInterface[]= [];
  nftDetail: NftInterface | undefined;
  constructor(private serviceNft: NftService) {
  }

  ngOnInit() {
    this.getUser();

  }

  getUser(){
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


}
