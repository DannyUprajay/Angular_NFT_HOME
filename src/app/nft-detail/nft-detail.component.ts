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



}
