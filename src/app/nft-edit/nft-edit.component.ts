import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
    private nftService : NftService,
    private router: Router

  ) {
  }

  public editNft: FormGroup = new FormGroup({
    name: new FormControl(''),
    pathImage: new FormControl(''),
    price: new FormControl(''),
  });

  ngOnInit() {
    console.log(this.route.snapshot.params['id'])
    this.nftService.getNftById(this.route.snapshot.params['id']).subscribe((result)  =>{
      console.log(result)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ;
      this.editNft = new FormGroup({
        name: new FormControl(result['name']),
        pathImage: new FormControl(result['pathImage']),
        price: new FormControl(result['price']),
      })
    });
  }



  update(){
  this.nftService.updateNft(this.route.snapshot.params['id'], this.editNft.value).subscribe((result)  => {
    console.log(result);
    this.router.navigate(['/nft/'+ this.route.snapshot.params['id']]);
  })
  }
}
