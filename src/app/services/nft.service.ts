import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {NftInterface} from "../nft.interface";
import {result, UserInterface} from "../user.interface";

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

  addNft(nft: NftInterface, token: string): Observable<result> {
    const body = JSON.stringify(nft);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<result>('https://127.0.0.1:8000/nft/new', body, { headers });
  }

  deleteNft(id: number): Observable<result>{
    return this.http.delete<result>('https://127.0.0.1:8000/nft/' + id);
  }

}
