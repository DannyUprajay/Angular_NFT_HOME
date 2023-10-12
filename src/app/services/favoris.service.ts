import { Injectable } from '@angular/core';
import {NftInterface} from "../nft.interface";

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  constructor() { }

  private favorites: NftInterface[] = [];

  addToFavorites(nft: NftInterface): boolean {
    let exists = this.favorites.some(favorite => favorite.id === nft.id);

    if (!exists) {
      this.favorites.push(nft);
      return true;
    } else {
      return false;
    }
  }

  getFavorites(): NftInterface[] {
    return this.favorites;
  }

  removeFavorite(id: number): void {
    const index = this.favorites.findIndex(favorite => favorite.id === id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }
}
