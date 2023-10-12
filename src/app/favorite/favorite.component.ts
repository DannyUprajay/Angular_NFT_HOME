import {Component, OnInit} from '@angular/core';
import {NftInterface} from "../nft.interface";
import {FavorisService} from "../services/favoris.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit{

  favorites: NftInterface[] = [];

  constructor(private favoris: FavorisService) {}

  ngOnInit() {
    this.favorites = this.favoris.getFavorites();
  }


}
