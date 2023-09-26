import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {NftInterface} from "../nft.interface";
import {UserInterface} from "../user.interface";

@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor(private http: HttpClient) { }

  getAllNft(): Observable<NftInterface[]>{
    return this.http.get<NftInterface[] >("https://127.0.0.1:8000/nft/");
  }

  getNftById(id: number): Observable<NftInterface>{
    return this.http.get<NftInterface>('https://127.0.0.1:8000/nft/' + id);
  }


}
