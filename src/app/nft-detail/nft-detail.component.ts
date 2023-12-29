import {Component, OnInit} from '@angular/core';
import {NftInterface} from "../nft.interface";
import {NftService} from "../services/nft.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {NftComponent} from "../nft/nft.component";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.css']
})
export class NftDetailComponent implements OnInit{

    nft: NftInterface | undefined;

  public editNft: FormGroup = new FormGroup({
    name: new FormControl(''),
    pathImage: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(
    private router: Router,
    private nftService: NftService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}


    ngOnInit() {
      this.route.params.subscribe(params => {
        let nftId = +params['id'];
        this.getNftId(nftId);
      });


      this.nftService.getNftById(this.route.snapshot.params['id']).subscribe((result) => {
        console.log(result);
        this.editNft = new FormGroup({
          name: new FormControl(result['name']),
          pathImage: new FormControl(result['pathImage']),
          price: new FormControl(result['price']),
        })

        // this.auth.clearToken();
        this.auth.getToken()
        // this.nftService.getUserData();

      });

    }


  update() {
    this.nftService.updateNft(this.route.snapshot.params['id'], this.editNft.value).subscribe((result) => {
      console.log(result);  // Check the console log for any errors or unexpected response
      this.router.navigate(['/nft/' + this.route.snapshot.params['id']]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    })
  }

  getNftId(id: number) {
        this.nftService.getNftById(id).subscribe(nftResult => {
            this.nft = nftResult;
            // console.log(this.nft);
        });
    }


  showEdit(): boolean {
    if (this.auth.getLoggedInUsername() === this.nft?.user.username) {
      return true;
    }
    return false;
  }


}
