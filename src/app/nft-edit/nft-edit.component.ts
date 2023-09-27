import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NftService} from "../services/nft.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-nft-edit',
  templateUrl: './nft-edit.component.html',
  styleUrls: ['./nft-edit.component.css']
})
export class NftEditComponent implements OnInit{


  constructor(
    private route:ActivatedRoute,
    private nftService : NftService

  ) {
  }


  ngOnInit() {
    console.log(this.route.snapshot.params['id'])
    this.nftService.getNftById(this.route.snapshot.params['id']).subscribe((result)  =>{
      console.log(result);
      this.editNft = new FormGroup({
        name: new FormControl(result['name']),
        pathImage: new FormControl(result['pathImage']),
        price: new FormControl(result['price']),
      })
    });
  }

  public editNft: FormGroup = new FormGroup({
    name: new FormControl(''),
    pathImage: new FormControl(''),
    price: new FormControl(''),
  });

  onSubmit(){
  this.nftService.updateNft(this.route.snapshot.params['id'], this.editNft.value).subscribe((result)  => {
    console.log(result);
  })
  }
}
