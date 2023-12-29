import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



import { NftInterface } from '../nft.interface';
import { result } from '../user.interface';

@Injectable({
  providedIn: 'root'
})
export class NftService {
  private baseUrl = 'https://danny-webdev.fr';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    const url = `${this.baseUrl}/nft`;
    return this.http.get(url);
  }

  getAllNft(): Observable<NftInterface[]> {
    return this.http.get<NftInterface[]>(`${this.baseUrl}/nft/`)

  }

  getNftById(id: number): Observable<NftInterface> {
    return this.http.get<NftInterface>(`${this.baseUrl}/nft/` + id)

  }

  addNft(nft: NftInterface, token: string): Observable<result> {
    const body = JSON.stringify(nft);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<result>(`${this.baseUrl}/nft/new`, body, { headers });
  }


  deleteNft(id: number): Observable<result> {
    return this.http.delete<result>(`${this.baseUrl}/nft/` + id)

  }

  updateNft(id: number, data: any): Observable<result> {
    const body = JSON.stringify(data);
    const header = { 'content-type': 'application/x-www-form-urlencoded' };
    return this.http.post<result>(`${this.baseUrl}/nft/${id}/edit`, body, { 'headers': header })

  }


}
