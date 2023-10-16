import { Component } from '@angular/core';
import {NftInterface} from "../nft.interface";

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent {

  nft: NftInterface | undefined;


}
